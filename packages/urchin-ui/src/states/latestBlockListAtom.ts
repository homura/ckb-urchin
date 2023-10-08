import { RPC } from '@ckb-lumos/rpc';
import { atomsWithQuery } from 'jotai-tanstack-query';

import { configAtom, rpcAtom } from './';

export type Block = Awaited<ReturnType<RPC['getBlock']>>;

export type BlockSummary = {
  height: number;
  timestamp: number;
  hash: string;
  transactionsCount: number;
  primaryReward: string;
  cellsCountChange: number;
};

const LATEST_BLOCK_LIST_SIZE = 10;
const LATEST_BLOCK_LIST_INTERVAL = 6000;

const [
  /**
   * the atom for the latest 10 blocks
   */
  latestBlockListAtom,
  /**
   * the atom for the status of the latest 10 blocks
   */
  latestBlockListStatusAtom,
] = atomsWithQuery<Block[]>((get) => ({
  queryKey: ['getLatestBlockList', get(configAtom).url],
  queryFn: async () => {
    const rpc = get(rpcAtom);
    const blockNumber = await rpc.getTipBlockNumber();

    // fetch the latest 10 blocks
    const blockHeights = Array.from({ length: LATEST_BLOCK_LIST_SIZE })
      .map((_, i) => Number(blockNumber) - i)
      .filter((height) => height > 0)
      .map((height) => '0x' + height.toString(16));

    const blocks = await Promise.all(
      blockHeights.map((height) => rpc.getBlockByNumber(height)),
    );

    return blocks;
  },
  refetchInterval: LATEST_BLOCK_LIST_INTERVAL,
}));

export { latestBlockListAtom, latestBlockListStatusAtom };
