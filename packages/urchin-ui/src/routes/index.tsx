import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

import { SearchBar } from '../components/SearchBar';
import { LatestBlockList } from './home/LatestBlockList';
import { LatestTransactionList } from './home/LatestTransactionList';

export const Home: React.FC = () => {
  return (
    <>
      <SearchBar />

      <SimpleGrid py={4} columns={[1, null, 2]} spacing={10}>
        <Box border="1px" borderColor="gray.200" borderRadius="md">
          <Box borderBottom="1px" borderColor="gray.200" p={2}>
            <Heading size="md">Latest Blocks</Heading>
          </Box>
          <Box p={2}>
            <LatestBlockList />
          </Box>
        </Box>
        <Box border="1px" borderColor="gray.200" borderRadius="md">
          <Box borderBottom="1px" borderColor="gray.200" p={2}>
            <Heading size="md">Latest Transactions</Heading>
          </Box>
          <Box p={2}>
            <LatestTransactionList />
          </Box>
        </Box>
      </SimpleGrid>
    </>
  );
};
