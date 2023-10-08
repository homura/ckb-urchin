/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BlockNumber: { input: string; output: string; }
  Byte32: { input: string; output: string; }
  Capacity: { input: string; output: string; }
  EpochNumberWithFraction: { input: string; output: string; }
  /** 256-bits hash digest */
  H256: { input: string; output: string; }
  InputTransaction: { input: any; output: any; }
  JsonBytes: { input: string; output: string; }
  ProposalShortId: { input: string; output: string; }
  Timestamp: { input: string; output: string; }
  Uint32: { input: string; output: string; }
  Uint64: { input: string; output: string; }
  Uint128: { input: string; output: string; }
  Version: { input: string; output: string; }
};

export type Block = {
  __typename?: 'Block';
  economicState: BlockEconomicState;
  extension: Scalars['JsonBytes']['output'];
  header: Header;
  proposals: Array<Scalars['ProposalShortId']['output']>;
  transactions: Array<Transaction>;
  uncles: Array<UncleBlock>;
};

export type BlockEconomicState = {
  __typename?: 'BlockEconomicState';
  finalizedAt: Scalars['H256']['output'];
  issuance: BlockIssuance;
  minerReward: MinerReward;
  txsFee: Scalars['Capacity']['output'];
};

export type BlockIssuance = {
  __typename?: 'BlockIssuance';
  primary: Scalars['Capacity']['output'];
  secondary: Scalars['Capacity']['output'];
};

export type CellDep = {
  __typename?: 'CellDep';
  depType: DepType;
  outPoint: OutPoint;
};

export type CellInput = {
  __typename?: 'CellInput';
  cellOutput?: Maybe<CellOutput>;
  previousOutput: OutPoint;
  since: Scalars['Uint64']['output'];
};

export type CellOutput = {
  __typename?: 'CellOutput';
  capacity: Scalars['Capacity']['output'];
  lock: Script;
  transaction?: Maybe<Transaction>;
  type?: Maybe<Script>;
};

export enum DepType {
  Code = 'Code',
  DepGroup = 'DepGroup'
}

export type FeeRateStatistics = {
  __typename?: 'FeeRateStatistics';
  mean?: Maybe<Scalars['Uint64']['output']>;
  median?: Maybe<Scalars['Uint64']['output']>;
};

export type Header = {
  __typename?: 'Header';
  block?: Maybe<Block>;
  compactTarget: Scalars['Uint32']['output'];
  dao: Scalars['Byte32']['output'];
  epoch: Scalars['EpochNumberWithFraction']['output'];
  extraHash: Scalars['H256']['output'];
  hash: Scalars['H256']['output'];
  nonce: Scalars['Uint128']['output'];
  number: Scalars['BlockNumber']['output'];
  parentHash: Scalars['H256']['output'];
  proposalsHash: Scalars['H256']['output'];
  timestamp: Scalars['Timestamp']['output'];
  transactionsRoot: Scalars['H256']['output'];
  version: Scalars['Version']['output'];
};

export type MinerReward = {
  __typename?: 'MinerReward';
  committed: Scalars['Capacity']['output'];
  primary: Scalars['Capacity']['output'];
  proposal: Scalars['Capacity']['output'];
  secondary: Scalars['Capacity']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sendTransaction: Scalars['H256']['output'];
};


export type MutationSendTransactionArgs = {
  tx: Scalars['InputTransaction']['input'];
};

export type OutPoint = {
  __typename?: 'OutPoint';
  index: Scalars['Uint32']['output'];
  txHash: Scalars['H256']['output'];
};

export type Query = {
  __typename?: 'Query';
  block?: Maybe<Block>;
  blocks: Array<Maybe<Block>>;
  estimateCycles: Scalars['Uint64']['output'];
  feeRateStatistics: FeeRateStatistics;
  transaction?: Maybe<Transaction>;
};


export type QueryBlockArgs = {
  hash?: InputMaybe<Scalars['H256']['input']>;
  height?: InputMaybe<Scalars['Uint64']['input']>;
};


export type QueryBlocksArgs = {
  hashes?: InputMaybe<Array<Scalars['H256']['input']>>;
  heights?: InputMaybe<Array<Scalars['Uint64']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEstimateCyclesArgs = {
  tx: Scalars['InputTransaction']['input'];
};


export type QueryFeeRateStatisticsArgs = {
  target?: InputMaybe<Scalars['Uint32']['input']>;
};


export type QueryTransactionArgs = {
  hash: Scalars['H256']['input'];
};

export type Script = {
  __typename?: 'Script';
  args: Scalars['JsonBytes']['output'];
  codeHash: Scalars['H256']['output'];
  hashType: ScriptHashType;
};

export enum ScriptHashType {
  Data = 'data',
  Data1 = 'data1',
  Data2 = 'data2',
  Type = 'type'
}

export type Transaction = {
  __typename?: 'Transaction';
  block?: Maybe<Block>;
  cellDeps: Array<CellDep>;
  cycles?: Maybe<Scalars['Uint64']['output']>;
  hash: Scalars['H256']['output'];
  headerDeps: Array<Scalars['H256']['output']>;
  inputs: Array<CellInput>;
  outputs: Array<CellOutput>;
  outputsData: Array<Scalars['JsonBytes']['output']>;
  status?: Maybe<TxStatus>;
  version: Scalars['Version']['output'];
  witnesses: Array<Scalars['JsonBytes']['output']>;
};

export enum TxStatus {
  Committed = 'committed',
  Pending = 'pending',
  Proposed = 'proposed',
  Rejected = 'rejected',
  Unknown = 'unknown'
}

export type UncleBlock = {
  __typename?: 'UncleBlock';
  header: Header;
  proposals: Array<Scalars['ProposalShortId']['output']>;
};

export type TxByHashQueryVariables = Exact<{
  txHash: Scalars['H256']['input'];
}>;


export type TxByHashQuery = { __typename?: 'Query', transaction?: { __typename?: 'Transaction', hash: string, cycles?: string | null, status?: TxStatus | null, block?: { __typename?: 'Block', header: { __typename?: 'Header', number: string, timestamp: string } } | null, inputs: Array<{ __typename?: 'CellInput', previousOutput: { __typename?: 'OutPoint', txHash: string }, cellOutput?: { __typename?: 'CellOutput', capacity: string, lock: { __typename?: 'Script', codeHash: string, hashType: ScriptHashType, args: string } } | null }>, outputs: Array<{ __typename?: 'CellOutput', capacity: string, lock: { __typename?: 'Script', codeHash: string, hashType: ScriptHashType, args: string } }> } | null };


export const TxByHashDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TxByHash"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"txHash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"H256"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"txHash"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"header"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cycles"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"inputs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"previousOutput"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cellOutput"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"lock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"codeHash"}},{"kind":"Field","name":{"kind":"Name","value":"hashType"}},{"kind":"Field","name":{"kind":"Name","value":"args"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"outputs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"lock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"codeHash"}},{"kind":"Field","name":{"kind":"Name","value":"hashType"}},{"kind":"Field","name":{"kind":"Name","value":"args"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TxByHashQuery, TxByHashQueryVariables>;