import { Link as ChakraLink } from '@chakra-ui/react';
import { Script } from '@ckb-lumos/base';
import { encodeToAddress } from '@ckb-lumos/helpers';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import MiddleEllipsis from 'react-middle-ellipsis';
import { Link } from 'react-router-dom';

import { configAtom } from '../../states';

export const CkbAddressLink: FC<{ script: Script }> = ({ script }) => {
  const { network } = useAtomValue(configAtom);
  const prefix = network === 'mainnet' ? 'ckb' : 'ckt';

  const address = encodeToAddress(
    { ...script },
    {
      config: { PREFIX: prefix, SCRIPTS: {} },
    },
  );

  return (
    <ChakraLink
      display="block"
      as={Link}
      to={`/address/${address}`}
      whiteSpace="nowrap"
    >
      <MiddleEllipsis>
        <span>{address}</span>
      </MiddleEllipsis>
    </ChakraLink>
  );
};
