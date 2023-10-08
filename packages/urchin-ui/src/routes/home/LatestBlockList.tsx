import {
  Box,
  Divider,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { FC, Suspense } from 'react';

import { CkbAmount } from '../../components/Amount';
import { BlockNumberLink } from '../../components/BlockNumber';
import { CkbAddressLink } from '../../components/CkbAddress';
import { RelativeTime } from '../../components/RealativeTime';
import { Block, latestBlockListAtom } from '../../states';

export const LatestBlockList: FC = () => {
  return (
    <Suspense
      fallback={
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      }
    >
      <BlockList />
    </Suspense>
  );
};

const BlockList: FC = () => {
  const blockList = useAtomValue(latestBlockListAtom);

  return (
    <VStack align="stretch" divider={<Divider />}>
      {blockList.map((block) => (
        <BlockItem key={block.header.hash} block={block} />
      ))}
    </VStack>
  );
};

const BlockItem: FC<{ block: Block }> = ({ block }) => {
  const blockNumber = Number(block.header.number);

  const transactionsCount = block.transactions.length;
  const coinbaseOutput = block.transactions[0].outputs[0];

  return (
    <Flex gap={8}>
      <Box justifyContent="start">
        <Flex flexDirection="column" gap={1} align="start">
          <BlockNumberLink blockNumber={blockNumber} />

          <Box>
            <Text fontSize="xs" color="gray.500">
              <RelativeTime date={Number(block.header.timestamp)} />
            </Text>
          </Box>
        </Flex>
      </Box>

      <Flex flexDirection="column" gap={1} flex={1} px={2} minW={0}>
        <HStack spacing={1}>
          <Box>Miner:</Box>
          <Box maxW="full" minW={0} whiteSpace="nowrap">
            <CkbAddressLink script={coinbaseOutput.lock} />
          </Box>
        </HStack>

        <Text fontSize="xs" color="gray.500">
          Reward: <CkbAmount almost amount={coinbaseOutput.capacity} />
        </Text>
      </Flex>

      <Box>{transactionsCount} TXs</Box>
    </Flex>
  );
};
