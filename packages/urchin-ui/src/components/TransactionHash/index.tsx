import { Link as ChakraLink } from '@chakra-ui/react';
import { FC } from 'react';
import MiddleEllipsis from 'react-middle-ellipsis';
import { Link } from 'react-router-dom';

export const TransactionLink: FC<{ hash?: string }> = ({ hash }) => {
  if (!hash) return <></>;
  return (
    <ChakraLink as={Link} to={`/transaction/${hash}`}>
      <MiddleEllipsis>
        <span className="ellipseMe">{hash}</span>
      </MiddleEllipsis>
    </ChakraLink>
  );
};
