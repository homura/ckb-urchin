import { FC } from 'react';
import { useMatch } from 'react-router-dom';

export const Block: FC = () => {
  const match = useMatch(`/block/:blockNumber`);
  return <>{match?.params.blockNumber}</>;
};
