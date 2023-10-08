import { Link as ChakraLink } from '@chakra-ui/react';
import numeral from 'numeral';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const BlockNumberLink: FC<{
  blockNumber?: string | number | bigint;
}> = ({ blockNumber }) => {
  if (!blockNumber) return null;

  const number = Number(blockNumber);

  return (
    <ChakraLink as={Link} to={`/block/${number}`} whiteSpace="nowrap">
      # {numeral(number).format('0,0')}
    </ChakraLink>
  );
};
