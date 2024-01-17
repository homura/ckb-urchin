import { ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { Script } from '@ckb-lumos/base';
import { BI } from '@ckb-lumos/bi';
import { useQuery } from '@tanstack/react-query';
import { FC, Suspense } from 'react';
import { useMatch } from 'react-router-dom';

import { CkbAmount } from '../../components/Amount';
import { CkbAddressLink } from '../../components/CkbAddress';
import { TransactionLink } from '../../components/TransactionHash';
import { graphql } from '../../gql';
import { useGraphqlFetch } from '../../states/useGraphqlFetch';

export const Block: FC = () => {
  return (
    <>
      <Suspense
        fallback={
          <Box>
            <Spinner />
          </Box>
        }
      >
        <BlockDetails />
      </Suspense>
    </>
  );
};

const BlockDetails = () => {
  const match = useMatch(`/block/:blockNumber`);
  const graphqlFetch = useGraphqlFetch();

  const blockByNumber = graphql(`
    query BockByNumber($blockNumber: Uint64!) {
      block(height: $blockNumber) {
        header {
          hash
          number
        }
        transactions {
          hash
          inputs {
            cellOutput {
              capacity
              lock {
                codeHash
                hashType
                args
              }
              type {
                codeHash
                hashType
                args
              }
            }
            previousOutput {
              txHash
              index
            }
          }
          outputs {
            capacity
            lock {
              codeHash
              hashType
              args
            }
            type {
              codeHash
              hashType
              args
            }
          }
        }
      }
    }
  `);

  const { data: res } = useQuery({
    queryKey: ['fetchBlock', { blockNumber: match?.params.blockNumber }],
    queryFn: () =>
      graphqlFetch(blockByNumber, {
        blockNumber: BI.from(match?.params.blockNumber).toHexString(),
      }),
    enabled: !!match?.params.blockNumber,
  });

  if (res?.errors) {
    throw res.errors[0];
  }

  const block = res?.data?.block;
  if (!block) return null;

  return (
    <Box>
      <Box>
        <Box p={4} bg="blackAlpha.400">
          <Box display="flex" alignItems="center" gap={4}>
            <Heading size={['xs', 'sm', 'md']}>Block</Heading>
            <Text fontSize="lg">{block.header.hash}</Text>
          </Box>
        </Box>
        <Divider my={4} />
      </Box>

      <Heading bg="blackAlpha.400" size="md" my={2} p={2}>
        Transactions({block.transactions.length})
      </Heading>

      {block.transactions.map((tx) => (
        <Box key={tx.hash} bg="blackAlpha.400" my={2} p={2}>
          <Box>
            <TransactionLink hash={tx.hash} />
          </Box>
          <Divider my={2} />
          <Flex alignItems="center" gap={8}>
            <Box flex={1}>
              {tx.inputs.map(({ previousOutput, cellOutput }) => {
                return (
                  <Flex
                    key={previousOutput.txHash + previousOutput.index}
                    justify="space-between"
                  >
                    <Box maxW="50%" minW={0} whiteSpace="nowrap">
                      {cellOutput ? (
                        <CkbAddressLink script={cellOutput.lock as Script} />
                      ) : (
                        'Cellbase'
                      )}
                    </Box>
                    <Box>
                      {cellOutput?.capacity && (
                        <CkbAmount amount={cellOutput?.capacity} />
                      )}
                    </Box>
                  </Flex>
                );
              })}
            </Box>
            <Box>
              <ArrowRightIcon />
            </Box>
            <Box flex={1}>
              {tx.outputs.map((cellOutput, index) => {
                return (
                  <Flex key={index} justify="space-between" w="full">
                    <Box maxW="50%" minW={0} whiteSpace="nowrap">
                      {cellOutput ? (
                        <CkbAddressLink script={cellOutput.lock as Script} />
                      ) : (
                        'Cellbase'
                      )}
                    </Box>
                    <Box>
                      <CkbAmount amount={cellOutput?.capacity || '0'} />
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};
