export type DepType = 'code' | 'depGroup';
export type ScriptHashType = 'data' | 'type' | 'data1' /*| 'data2'*/;
export type TxStatus =
  | 'committed'
  | 'pending'
  | 'proposed'
  | 'unknown'
  | 'rejected';
