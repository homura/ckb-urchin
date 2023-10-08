import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Script } from '@ckb-lumos/base';
import { useQuery } from '@tanstack/react-query';
import { FC, Suspense } from 'react';
import MiddleEllipsis from 'react-middle-ellipsis';
import { Link, useMatch } from 'react-router-dom';

import { CkbAmount } from '../../components/Amount';
import { BlockNumberLink } from '../../components/BlockNumber';
import { CkbAddressLink } from '../../components/CkbAddress';
import { RelativeTime } from '../../components/RealativeTime';
import { graphql } from '../../gql';
import { useGraphqlFetch } from '../../states/useGraphqlFetch';

export const Transaction: FC = () => {
  const match = useMatch(`/transaction/:txHash`);

  const txHash = match?.params.txHash;
  if (!txHash) return null;

  return (
    <>
      <Box p={4} bg="blackAlpha.400">
        <Heading size={['xs', 'sm', 'md']} whiteSpace="nowrap">
          <HStack>
            <Text display="inline-block" mr={2}>
              Transaction
            </Text>
            <Box overflow="clip">
              <MiddleEllipsis>
                <span className="ellipseMe">{txHash}</span>
              </MiddleEllipsis>
            </Box>
          </HStack>
        </Heading>
      </Box>
      <Divider my={3} />
      <Suspense
        fallback={
          <Box>
            <Spinner />
          </Box>
        }
      >
        <Suspense
          fallback={
            <Flex justifyContent="center">
              <Spinner />
            </Flex>
          }
        >
          <TransactionHeader txHash={txHash} />
        </Suspense>
      </Suspense>
    </>
  );
};

const TransactionHeader = ({ txHash }: { txHash: string }) => {
  const graphqlFetch = useGraphqlFetch();

  const txByHashDocumentNode = graphql(`
    query TxByHash($txHash: H256!) {
      transaction(hash: $txHash) {
        hash
        block {
          header {
            number
            timestamp
          }
        }
        cycles
        status

        inputs {
          previousOutput {
            txHash
          }
          cellOutput {
            capacity
            lock {
              codeHash
              hashType
              args
            }
          }
        }

        outputs {
          capacity
          lock {
            codeHash
            hashType
            args
          }
        }
      }
    }
  `);

  const { data } = useQuery({
    queryKey: ['fetchTransaction', { txHash }],
    queryFn: async () => await graphqlFetch(txByHashDocumentNode, { txHash }),
    enabled: !!txHash,
  });

  if (data?.errors) {
    throw data.errors[0];
  }

  const tx = data?.data?.transaction;
  if (!tx) return null;

  const inputs = tx.inputs.map((input, i) => (
    <SimpleGrid columns={2} key={`input-${i}`}>
      <Box>
        {input.cellOutput && (
          <Flex>
            <Box>
              <ChakraLink
                display="block"
                as={Link}
                to={`/transaction/${input.previousOutput.txHash}`}
                whiteSpace="nowrap"
                mr={1}
              >
                <ArrowForwardIcon />
              </ChakraLink>
            </Box>
            <Box w="full">
              <CkbAddressLink script={{ ...input.cellOutput.lock } as Script} />
            </Box>
          </Flex>
        )}
      </Box>
      <Box w="full" textAlign="right">
        {input.cellOutput && (
          <CkbAmount amount={input.cellOutput.capacity} precision={8} />
        )}
      </Box>
    </SimpleGrid>
  ));

  const outputs = tx.outputs.map((output, i) => (
    <SimpleGrid columns={2} key={`output-${i}`}>
      <Box>
        {output && <CkbAddressLink script={{ ...output.lock } as Script} />}
      </Box>
      <Box w="full" textAlign="right">
        {output && <CkbAmount amount={output.capacity} precision={8} />}
      </Box>
    </SimpleGrid>
  ));

  return (
    <>
      <SimpleGrid columns={[1, null, 2]} spacingY={2} spacingX={12}>
        <Flex w="full">
          <Box>Block Height</Box>
          <Spacer />
          <Box>
            <BlockNumberLink blockNumber={tx.block?.header.number} />
          </Box>
        </Flex>

        <Flex w="full">
          <Box>Timestamp</Box>
          <Spacer />
          <Box>
            <RelativeTime date={Number(tx.block?.header.timestamp)} />
          </Box>
        </Flex>

        <Flex w="full">
          <Box>Cycles</Box>
          <Spacer />
          <Box>{tx.cycles}</Box>
        </Flex>

        <Flex w="full">
          <Box>Status</Box>
          <Spacer />
          <Box>{tx.status}</Box>
        </Flex>
      </SimpleGrid>

      <Divider my={10} />
      <Heading size="md" my={2}>
        Inputs
      </Heading>
      {inputs}
      <Divider my={10} />

      <Heading size="md" my={2}>
        Outputs
      </Heading>
      {outputs}
    </>
  );
};
