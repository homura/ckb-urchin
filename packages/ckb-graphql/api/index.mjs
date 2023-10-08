import http from 'node:http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { createBatchRpc, resolvers, typeDefs } from '../lib/index.js';

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true,
});
await server.start();

app.use(cors(), bodyParser.json());
app.use(
  '/api',
  expressMiddleware(server, {
    context: () => ({ ckbRpc: createBatchRpc('https://testnet.ckb.dev') }),
  }),
);

export default app;
