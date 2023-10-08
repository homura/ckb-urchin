import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { RPC } from '@ckb-lumos/rpc';

import { resolvers } from '../resolvers.js';
import { typeDefs } from '../typeDefs.js';

const server = new ApolloServer({ resolvers, typeDefs });

await startStandaloneServer(server, {
  context: async () => ({
    ckbRpc: new RPC(process.env.CKB_RPC || 'http://localhost:8114'),
  }),
});
