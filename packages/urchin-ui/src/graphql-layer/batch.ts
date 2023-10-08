import { RPC } from '@ckb-lumos/rpc';
import DataLoader from 'dataloader';
import * as lru from 'lru_map';

const LRUMap = lru.LRUMap;

export interface Options {
  url: string;
}

type RpcMethods = keyof RPC;
const CACHE_METHODS = new Set<string>([
  'getTransaction',
  'getBlock',
  'getBlockEconomicState',
] satisfies RpcMethods[]);

const cacheKeyHandler = {
  serialize: (key: unknown[]) => {
    return key.map((item) => JSON.stringify(item)).join('/');
  },
  deserialize: (key: string) => {
    return key.split('/').map((item) => JSON.parse(item));
  },
};

export function makeBatchRpc(options: Options): RPC {
  const rpc = new RPC(options.url);
  const cache = new LRUMap<string, any>(100);

  const proxyCache = new Proxy(cache, {
    get(target, mapMethod) {
      // when the method is `set`,
      // we will cache the response only when the key is in CACHE_METHODS
      if (mapMethod === 'set') {
        return (key: string, val: unknown) => {
          const [method] = cacheKeyHandler.deserialize(key);
          if (CACHE_METHODS.has(method)) {
            target.set(key, val);
          }
        };
      }

      return Reflect.get(target, mapMethod);
    },
  });

  const loader = new DataLoader<[string, ...unknown[]], unknown, string>(
    async (methods) => rpc.createBatchRequest(methods).exec(),
    {
      cache: true,
      cacheMap: proxyCache,
      cacheKeyFn: cacheKeyHandler.serialize,
    },
  );

  return new Proxy({} as RPC, {
    get(_, methodName: string) {
      if (methodName in rpc) {
        return (...args: unknown[]) => loader.load([methodName, ...args]);
      }
    },
  });
}
