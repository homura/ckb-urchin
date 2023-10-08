/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeExecutableSchema } from '@graphql-tools/schema';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { resolvers, typeDefs } from 'ckb-graphql';
import { graphql as executeGraphql, print } from 'graphql';

import { makeBatchRpc, Options } from './batch';

interface GqlFetcher {
  fetch: GqlFetch;
}

export interface GqlFetch {
  /**
   * @example
   * makeFetcher({ url: 'https://testnet.ckb.dev' })
   *   .fetch(
   *     graphql(
   *       `
   *         query TxQuery($hash: H256!) {
   *           transaction(hash: $hash) {
   *             hash
   *             block {
   *               header {
   *                 number
   *               }
   *             }
   *           }
   *         }
   *       `,
   *     ),
   *     { hash: '0x...' },
   *   )
   *   .then((res) => {
   *     console.log(res.data?.transaction?.block?.header?.number);
   *   });
   */
  <TData = any, TVariables extends Record<string, any> = Record<string, any>>(
    operation: TypedDocumentNode<TData, TVariables>,
    variables?: TVariables,
  ): Promise<GqlFetchResult<TData>>;
}

type GqlFetchResult<TData = any> = {
  data?: TData;
  errors?: Error[];
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

/**
 *
 * @param options
 */
export function makeFetcher(options: Options): GqlFetcher {
  const batchRpc = makeBatchRpc(options);
  const contextValue = { ckbRpc: batchRpc };

  return {
    fetch: (operation, variables) => {
      return executeGraphql({
        schema,
        contextValue,
        source: print(operation),
        variableValues: variables,
      }) as Promise<GqlFetchResult>;
    },
  };
}
