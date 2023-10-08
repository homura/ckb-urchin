import { FC } from 'react';
import { useMatch } from 'react-router-dom';

export const Address: FC = () => {
  const match = useMatch(`/address/:address`);
  return <>{match?.params.address}</>;
};
