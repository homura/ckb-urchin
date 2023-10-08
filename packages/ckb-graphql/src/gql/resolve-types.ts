import { ScriptHashType } from '../types.js';
import { DepType } from '../types.js';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export { DepType };

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

export { ScriptHashType };

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
  committed = 'committed',
  pending = 'pending',
  proposed = 'proposed',
  rejected = 'rejected',
  unknown = 'unknown'
}

export type UncleBlock = {
  __typename?: 'UncleBlock';
  header: Header;
  proposals: Array<Scalars['ProposalShortId']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Block: ResolverTypeWrapper<Block>;
  BlockEconomicState: ResolverTypeWrapper<BlockEconomicState>;
  BlockIssuance: ResolverTypeWrapper<BlockIssuance>;
  BlockNumber: ResolverTypeWrapper<Scalars['BlockNumber']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Byte32: ResolverTypeWrapper<Scalars['Byte32']['output']>;
  Capacity: ResolverTypeWrapper<Scalars['Capacity']['output']>;
  CellDep: ResolverTypeWrapper<CellDep>;
  CellInput: ResolverTypeWrapper<CellInput>;
  CellOutput: ResolverTypeWrapper<CellOutput>;
  DepType: DepType;
  EpochNumberWithFraction: ResolverTypeWrapper<Scalars['EpochNumberWithFraction']['output']>;
  FeeRateStatistics: ResolverTypeWrapper<FeeRateStatistics>;
  H256: ResolverTypeWrapper<Scalars['H256']['output']>;
  Header: ResolverTypeWrapper<Header>;
  InputTransaction: ResolverTypeWrapper<Scalars['InputTransaction']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JsonBytes: ResolverTypeWrapper<Scalars['JsonBytes']['output']>;
  MinerReward: ResolverTypeWrapper<MinerReward>;
  Mutation: ResolverTypeWrapper<{}>;
  OutPoint: ResolverTypeWrapper<OutPoint>;
  ProposalShortId: ResolverTypeWrapper<Scalars['ProposalShortId']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Script: ResolverTypeWrapper<Script>;
  ScriptHashType: ScriptHashType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TxStatus: TxStatus;
  Uint32: ResolverTypeWrapper<Scalars['Uint32']['output']>;
  Uint64: ResolverTypeWrapper<Scalars['Uint64']['output']>;
  Uint128: ResolverTypeWrapper<Scalars['Uint128']['output']>;
  UncleBlock: ResolverTypeWrapper<UncleBlock>;
  Version: ResolverTypeWrapper<Scalars['Version']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Block: Block;
  BlockEconomicState: BlockEconomicState;
  BlockIssuance: BlockIssuance;
  BlockNumber: Scalars['BlockNumber']['output'];
  Boolean: Scalars['Boolean']['output'];
  Byte32: Scalars['Byte32']['output'];
  Capacity: Scalars['Capacity']['output'];
  CellDep: CellDep;
  CellInput: CellInput;
  CellOutput: CellOutput;
  EpochNumberWithFraction: Scalars['EpochNumberWithFraction']['output'];
  FeeRateStatistics: FeeRateStatistics;
  H256: Scalars['H256']['output'];
  Header: Header;
  InputTransaction: Scalars['InputTransaction']['output'];
  Int: Scalars['Int']['output'];
  JsonBytes: Scalars['JsonBytes']['output'];
  MinerReward: MinerReward;
  Mutation: {};
  OutPoint: OutPoint;
  ProposalShortId: Scalars['ProposalShortId']['output'];
  Query: {};
  Script: Script;
  String: Scalars['String']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  Transaction: Transaction;
  Uint32: Scalars['Uint32']['output'];
  Uint64: Scalars['Uint64']['output'];
  Uint128: Scalars['Uint128']['output'];
  UncleBlock: UncleBlock;
  Version: Scalars['Version']['output'];
};

export type BlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Block'] = ResolversParentTypes['Block']> = {
  economicState?: Resolver<ResolversTypes['BlockEconomicState'], ParentType, ContextType>;
  extension?: Resolver<ResolversTypes['JsonBytes'], ParentType, ContextType>;
  header?: Resolver<ResolversTypes['Header'], ParentType, ContextType>;
  proposals?: Resolver<Array<ResolversTypes['ProposalShortId']>, ParentType, ContextType>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType>;
  uncles?: Resolver<Array<ResolversTypes['UncleBlock']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockEconomicStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlockEconomicState'] = ResolversParentTypes['BlockEconomicState']> = {
  finalizedAt?: Resolver<ResolversTypes['H256'], ParentType, ContextType>;
  issuance?: Resolver<ResolversTypes['BlockIssuance'], ParentType, ContextType>;
  minerReward?: Resolver<ResolversTypes['MinerReward'], ParentType, ContextType>;
  txsFee?: Resolver<ResolversTypes['Capacity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockIssuanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlockIssuance'] = ResolversParentTypes['BlockIssuance']> = {
  primary?: Resolver<ResolversTypes['Capacity'], ParentType, ContextType>;
  secondary?: Resolver<ResolversTypes['Capacity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BlockNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BlockNumber'], any> {
  name: 'BlockNumber';
}

export interface Byte32ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte32'], any> {
  name: 'Byte32';
}

export interface CapacityScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Capacity'], any> {
  name: 'Capacity';
}

export type CellDepResolvers<ContextType = any, ParentType extends ResolversParentTypes['CellDep'] = ResolversParentTypes['CellDep']> = {
  depType?: Resolver<ResolversTypes['DepType'], ParentType, ContextType>;
  outPoint?: Resolver<ResolversTypes['OutPoint'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CellInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CellInput'] = ResolversParentTypes['CellInput']> = {
  cellOutput?: Resolver<Maybe<ResolversTypes['CellOutput']>, ParentType, ContextType>;
  previousOutput?: Resolver<ResolversTypes['OutPoint'], ParentType, ContextType>;
  since?: Resolver<ResolversTypes['Uint64'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CellOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CellOutput'] = ResolversParentTypes['CellOutput']> = {
  capacity?: Resolver<ResolversTypes['Capacity'], ParentType, ContextType>;
  lock?: Resolver<ResolversTypes['Script'], ParentType, ContextType>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['Script']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DepTypeResolvers = EnumResolverSignature<{ Code?: any, DepGroup?: any }, ResolversTypes['DepType']>;

export interface EpochNumberWithFractionScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EpochNumberWithFraction'], any> {
  name: 'EpochNumberWithFraction';
}

export type FeeRateStatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeeRateStatistics'] = ResolversParentTypes['FeeRateStatistics']> = {
  mean?: Resolver<Maybe<ResolversTypes['Uint64']>, ParentType, ContextType>;
  median?: Resolver<Maybe<ResolversTypes['Uint64']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface H256ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['H256'], any> {
  name: 'H256';
}

export type HeaderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Header'] = ResolversParentTypes['Header']> = {
  block?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType>;
  compactTarget?: Resolver<ResolversTypes['Uint32'], ParentType, ContextType>;
  dao?: Resolver<ResolversTypes['Byte32'], ParentType, ContextType>;
  epoch?: Resolver<ResolversTypes['EpochNumberWithFraction'], ParentType, ContextType>;
  extraHash?: Resolver<ResolversTypes['H256'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['H256'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['Uint128'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['BlockNumber'], ParentType, ContextType>;
  parentHash?: Resolver<ResolversTypes['H256'], ParentType, ContextType>;
  proposalsHash?: Resolver<ResolversTypes['H256'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  transactionsRoot?: Resolver<ResolversTypes['H256'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Version'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface InputTransactionScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['InputTransaction'], any> {
  name: 'InputTransaction';
}

export interface JsonBytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JsonBytes'], any> {
  name: 'JsonBytes';
}

export type MinerRewardResolvers<ContextType = any, ParentType extends ResolversParentTypes['MinerReward'] = ResolversParentTypes['MinerReward']> = {
  committed?: Resolver<ResolversTypes['Capacity'], ParentType, ContextType>;
  primary?: Resolver<ResolversTypes['Capacity'], ParentType, ContextType>;
  proposal?: Resolver<ResolversTypes['Capacity'], ParentType, ContextType>;
  secondary?: Resolver<ResolversTypes['Capacity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  sendTransaction?: Resolver<ResolversTypes['H256'], ParentType, ContextType, RequireFields<MutationSendTransactionArgs, 'tx'>>;
};

export type OutPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['OutPoint'] = ResolversParentTypes['OutPoint']> = {
  index?: Resolver<ResolversTypes['Uint32'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['H256'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ProposalShortIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ProposalShortId'], any> {
  name: 'ProposalShortId';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  block?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType, Partial<QueryBlockArgs>>;
  blocks?: Resolver<Array<Maybe<ResolversTypes['Block']>>, ParentType, ContextType, Partial<QueryBlocksArgs>>;
  estimateCycles?: Resolver<ResolversTypes['Uint64'], ParentType, ContextType, RequireFields<QueryEstimateCyclesArgs, 'tx'>>;
  feeRateStatistics?: Resolver<ResolversTypes['FeeRateStatistics'], ParentType, ContextType, Partial<QueryFeeRateStatisticsArgs>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionArgs, 'hash'>>;
};

export type ScriptResolvers<ContextType = any, ParentType extends ResolversParentTypes['Script'] = ResolversParentTypes['Script']> = {
  args?: Resolver<ResolversTypes['JsonBytes'], ParentType, ContextType>;
  codeHash?: Resolver<ResolversTypes['H256'], ParentType, ContextType>;
  hashType?: Resolver<ResolversTypes['ScriptHashType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptHashTypeResolvers = EnumResolverSignature<{ data?: any, data1?: any, data2?: any, type?: any }, ResolversTypes['ScriptHashType']>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  block?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType>;
  cellDeps?: Resolver<Array<ResolversTypes['CellDep']>, ParentType, ContextType>;
  cycles?: Resolver<Maybe<ResolversTypes['Uint64']>, ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['H256'], ParentType, ContextType>;
  headerDeps?: Resolver<Array<ResolversTypes['H256']>, ParentType, ContextType>;
  inputs?: Resolver<Array<ResolversTypes['CellInput']>, ParentType, ContextType>;
  outputs?: Resolver<Array<ResolversTypes['CellOutput']>, ParentType, ContextType>;
  outputsData?: Resolver<Array<ResolversTypes['JsonBytes']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TxStatus']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Version'], ParentType, ContextType>;
  witnesses?: Resolver<Array<ResolversTypes['JsonBytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Uint32ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Uint32'], any> {
  name: 'Uint32';
}

export interface Uint64ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Uint64'], any> {
  name: 'Uint64';
}

export interface Uint128ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Uint128'], any> {
  name: 'Uint128';
}

export type UncleBlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['UncleBlock'] = ResolversParentTypes['UncleBlock']> = {
  header?: Resolver<ResolversTypes['Header'], ParentType, ContextType>;
  proposals?: Resolver<Array<ResolversTypes['ProposalShortId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface VersionScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Version'], any> {
  name: 'Version';
}

export type Resolvers<ContextType = any> = {
  Block?: BlockResolvers<ContextType>;
  BlockEconomicState?: BlockEconomicStateResolvers<ContextType>;
  BlockIssuance?: BlockIssuanceResolvers<ContextType>;
  BlockNumber?: GraphQLScalarType;
  Byte32?: GraphQLScalarType;
  Capacity?: GraphQLScalarType;
  CellDep?: CellDepResolvers<ContextType>;
  CellInput?: CellInputResolvers<ContextType>;
  CellOutput?: CellOutputResolvers<ContextType>;
  DepType?: DepTypeResolvers;
  EpochNumberWithFraction?: GraphQLScalarType;
  FeeRateStatistics?: FeeRateStatisticsResolvers<ContextType>;
  H256?: GraphQLScalarType;
  Header?: HeaderResolvers<ContextType>;
  InputTransaction?: GraphQLScalarType;
  JsonBytes?: GraphQLScalarType;
  MinerReward?: MinerRewardResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OutPoint?: OutPointResolvers<ContextType>;
  ProposalShortId?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Script?: ScriptResolvers<ContextType>;
  ScriptHashType?: ScriptHashTypeResolvers;
  Timestamp?: GraphQLScalarType;
  Transaction?: TransactionResolvers<ContextType>;
  Uint32?: GraphQLScalarType;
  Uint64?: GraphQLScalarType;
  Uint128?: GraphQLScalarType;
  UncleBlock?: UncleBlockResolvers<ContextType>;
  Version?: GraphQLScalarType;
};

