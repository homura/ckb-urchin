import { chakra } from '@chakra-ui/react';
import { formatUnit } from '@ckb-lumos/bi';
import numeral from 'numeral';
import { FC, useMemo } from 'react';

type Props = {
  amount: string | bigint;
  showUnit?: boolean;
  precision?: number;
  almost?: boolean;
};
export const CkbAmount: FC<Props> = ({
  amount,
  showUnit = true,
  precision = 4,
  almost = false,
}) => {
  const [integer, fraction] = numeral(formatUnit(amount, 'ckb'))
    .format(`0,0.${'0'.repeat(precision)}`)
    .split('.');

  const fractionEl = useMemo(() => {
    if (!fraction) {
      return null;
    }

    return <chakra.small color="gray.500">.{fraction}</chakra.small>;
  }, [fraction]);

  return (
    <chakra.span whiteSpace="nowrap">
      {almost && '\u2248'}
      {integer}
      {fractionEl} {showUnit ? 'CKB' : ''}
    </chakra.span>
  );
};
