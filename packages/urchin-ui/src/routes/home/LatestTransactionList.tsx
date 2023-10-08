import {
  Box,
  Divider,
  Flex,
  Spacer,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Transaction } from '@ckb-lumos/base';
import { useAtomValue } from 'jotai';
import { FC, Suspense } from 'react';

import { CkbAmount } from '../../components/Amount';
import { BlockNumberLink } from '../../components/BlockNumber';
import { TransactionLink } from '../../components/TransactionHash';
import { Block, latestBlockListAtom } from '../../states';

export const LatestTransactionList: React.FC = () => {
  return (
    <Suspense
      fallback={
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      }
    >
      <TransactionList />
    </Suspense>
  );
};

const TransactionList: FC = () => {
  const blockList = useAtomValue(latestBlockListAtom);
  const latestBlockNumber = blockList[0].header.number;
  const latest10Txs = blockList
    .flatMap((block) =>
      block.transactions
        // skip the coinbase transaction
        .slice(1)
        .map<[Block, Transaction]>((tx) => [block, tx]),
    )
    .slice(0, 10);

  return (
    <VStack align="stretch" divider={<Divider />}>
      {latest10Txs.map(([block, transaction]) => (
        <TransactionItem
          key={transaction.hash}
          tx={transaction}
          latestBlockNumber={latestBlockNumber}
          txBlockNumber={block.header.number}
        />
      ))}
    </VStack>
  );
};

const TransactionItem: FC<{
  tx: Transaction;
  txBlockNumber: string;
  latestBlockNumber: string;
}> = ({ tx, txBlockNumber, latestBlockNumber }) => {
  const txBlockNumberInt = Number(txBlockNumber);
  const latestBlockNumberInt = Number(latestBlockNumber);

  const confirmations = latestBlockNumberInt - txBlockNumberInt;
  const totalOutputCapacity = tx.outputs.reduce(
    (acc, output) => acc + BigInt(output.capacity),
    BigInt(0),
  );

  return (
    <Flex gap={8}>
      <Flex
        flexDirection="column"
        gap={1}
        minW={0}
        maxW="200px"
        whiteSpace="nowrap"
      >
        <Box maxW="full" minW={0} whiteSpace="nowrap">
          <TransactionLink hash={tx.hash} />
        </Box>

        <Box>
          <Text fontSize="xs" color="gray.500">
            {confirmations} Confirmations
          </Text>
        </Box>
      </Flex>

      <Box>
        <BlockNumberLink blockNumber={txBlockNumber} />
      </Box>

      <Spacer />

      <Box justifySelf="end">
        <CkbAmount amount={totalOutputCapacity} />
      </Box>
    </Flex>
  );
};
