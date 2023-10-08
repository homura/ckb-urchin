import { RPC } from '@ckb-lumos/rpc';

import { Block, Resolvers, Transaction } from './gql/resolve-types.js';

export const resolvers: Resolvers<{ ckbRpc: RPC }> = {
  Query: {
    async block(_, args, { ckbRpc }) {
      if (args.hash) {
        return ckbRpc.getBlock(args.hash) as Promise<Block>;
      }
      if (args.height) {
        return ckbRpc.getBlockByNumber(args.height) as Promise<Block>;
      }

      const height = await ckbRpc.getTipBlockNumber();
      return ckbRpc.getBlockByNumber(height) as Promise<Block>;
    },
    async blocks(_, args, { ckbRpc }) {
      if (args.hashes) {
        return Promise.all(
          args.hashes.map((hash) => ckbRpc.getBlock(hash) as Promise<Block>),
        );
      }
      if (args.heights) {
        return Promise.all(
          args.heights.map(
            (height) => ckbRpc.getBlockByNumber(height) as Promise<Block>,
          ),
        );
      }

      const height = await ckbRpc.getTipBlockNumber();
      return Array.from({ length: args.limit || 10 }).map((_, index) => {
        return ckbRpc.getBlockByNumber(
          '0x' + (Number(height) - index).toString(16),
        ) as Promise<Block>;
      });
    },

    async estimateCycles(_, args, { ckbRpc }) {
      const res = await ckbRpc.estimateCycles(args as any);
      return res.cycles;
    },

    async transaction(_, args, { ckbRpc }) {
      const tx = await ckbRpc.getTransaction(args.hash);

      return {
        ...tx.transaction,
        status: tx.txStatus.status,
        cycles: 'cycles' in tx ? tx.cycles : '0x',
      } as Transaction;
    },
  },

  Transaction: {
    async block(transaction, _, { ckbRpc }) {
      const proof = await ckbRpc.getTransactionProof([transaction.hash]);
      return ckbRpc.getBlock(proof.blockHash) as Promise<Block>;
    },
  },

  CellInput: {
    cellOutput: async (parent, _, { ckbRpc }) => {
      if (BigInt(parent.previousOutput.txHash) === BigInt(0)) return null;
      const res = await ckbRpc.getTransaction(parent.previousOutput.txHash);
      return res.transaction.outputs[Number(parent.previousOutput.index)];
    },
  },
  Header: {
    block: (header, _, { ckbRpc }) => {
      return ckbRpc.getBlock(header.hash) as Promise<Block>;
    },
  },
  Block: {
    economicState: (block, _, { ckbRpc }) => {
      return ckbRpc.getBlockEconomicState(block.header.hash);
    },
  },
};
