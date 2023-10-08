import { RPC } from '@ckb-lumos/rpc';
import DataLoader from 'dataloader';
import lru from 'lru_map';

const { LRUMap } = lru;

export function createBatchRpc(url: string): RPC {
  const rpc = new RPC(url);
  const cache = new LRUMap<string, any>(100);

  const proxyCache = new Proxy(cache, {
    get(target, cacheMethod) {
      if (cacheMethod === 'set') {
        return (key: string, val: unknown) => {
          const [, param0] = key.split('/');
          if (param0 === undefined) return;
          target.set(key, val);
        };
      }

      return Reflect.get(target, cacheMethod);
    },
  });

  const loader = new DataLoader<[string, ...any[]], any, string>(
    async (methods) => rpc.createBatchRequest(methods).exec(),
    {
      cache: true,
      cacheMap: proxyCache,
      cacheKeyFn: (key) => {
        return key.join('/');
      },
    },
  );

  return new Proxy({} as RPC, {
    get(_, methodName: string) {
      if (methodName in rpc) {
        return (...args: any[]) => loader.load([methodName, ...args]);
      }
    },
  });
}
