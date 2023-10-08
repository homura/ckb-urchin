import { RPC } from '@ckb-lumos/rpc';
import DataLoader from 'dataloader';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { LRUMap } from 'lru_map';

type Config = { url: string; network: string };

const DEFAULT_CONFIG = {
  url: 'https://testnet.ckb.dev',
  network: 'ckb_testnet',
};

/**
 * it can be modified in the local storage
 */
export const configAtom = atomWithStorage<Config>(
  'urchin-config',
  DEFAULT_CONFIG,
);

/**
 * `atomWithStorage` won't write the initial value to the local storage,
 * so we need to write it manually at the first time.
 * This is convenient for development when we want to modify the config in the local storage directly.
 * @param config
 */
export function useInitConfig(config?: Config) {
  const [, setConfig] = useAtom(configAtom);

  if (
    globalThis &&
    'localStorage' in globalThis &&
    localStorage.getItem('urchin-config') == null
  ) {
    setConfig(config ?? DEFAULT_CONFIG);
  }
}

/**
 * an atom for the RPC instance, which is a proxy, and the proxy will batch the requests and cache the responses
 */
export const rpcAtom = atom<RPC>((get) => {
  const { url } = get(configAtom);

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
});

export {
  type Block,
  latestBlockListAtom,
  latestBlockListStatusAtom,
} from './latestBlockListAtom';
