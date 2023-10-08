import { atom, useAtom } from 'jotai';

import { makeFetcher } from '../graphql-layer';
import { GqlFetch } from '../graphql-layer/fetcher';
import { configAtom } from './index.js';

export const fetcherAtom = atom((get) => {
  const config = get(configAtom);
  return makeFetcher({ url: config.url });
});

export function useGraphqlFetch(): GqlFetch {
  const [fetcher] = useAtom(fetcherAtom);

  return fetcher.fetch;
}
