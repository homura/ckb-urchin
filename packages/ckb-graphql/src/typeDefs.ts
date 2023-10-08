// eslint-disable
// prettier-ignore
export const typeDefs = `
schema {
  query: Query
  mutation: Mutation
}

type Query {
  block(hash: H256, height: Uint64): Block
  blocks(hashes: [H256!], heights: [Uint64!], limit: Int): [Block]!
  transaction(hash: H256!): Transaction
  estimateCycles(tx: InputTransaction!): Uint64!
  feeRateStatistics(target: Uint32): FeeRateStatistics!
}

type Mutation {
  sendTransaction(tx: InputTransaction!): H256!
}

enum ScriptHashType {
  data
  type
  data1
  data2
}

type Script {
  codeHash: H256!
  hashType: ScriptHashType!
  args: JsonBytes!
}

type CellOutput {
  capacity: Capacity!
  lock: Script!
  type: Script
  transaction: Transaction
}

type OutPoint {
  txHash: H256!
  index: Uint32!
}

"""
The input cell, aka the UTXO(Unspent Transaction Output)
"""
type CellInput {
  previousOutput: OutPoint!
  since: Uint64!
  cellOutput: CellOutput
}

enum DepType {
  Code
  DepGroup
}

"""
A transaction is composed of a set of inputs and outputs
"""
type Transaction {
  "A blake2b hash of the serialized transactions"
  hash: H256!
  version: Version!
  cellDeps: [CellDep!]!
  headerDeps: [H256!]!
  inputs: [CellInput!]!
  outputs: [CellOutput!]!
  outputsData: [JsonBytes!]!
  witnesses: [JsonBytes!]!
  block: Block
  cycles: Uint64
  status: TxStatus
}

enum TxStatus {
  pending
  proposed
  committed
  rejected
  unknown
}

type Block {
  header: Header!
  uncles: [UncleBlock!]!
  transactions: [Transaction!]!
  proposals: [ProposalShortId!]!
  extension: JsonBytes!
  economicState: BlockEconomicState!
}

type Header {
  hash: H256!
  version: Version!
  parentHash: H256!
  compactTarget: Uint32!
  timestamp: Timestamp!
  number: BlockNumber!
  epoch: EpochNumberWithFraction!
  transactionsRoot: H256!
  proposalsHash: H256!
  extraHash: H256!
  dao: Byte32!
  nonce: Uint128!

  block: Block
}

type UncleBlock {
  header: Header!
  proposals: [ProposalShortId!]!
}

type CellDep {
  outPoint: OutPoint!
  depType: DepType!
}

type BlockIssuance {
  primary: Capacity!
  secondary: Capacity!
}

type MinerReward {
  primary: Capacity!
  secondary: Capacity!
  committed: Capacity!
  proposal: Capacity!
}

type BlockEconomicState {
  issuance: BlockIssuance!
  minerReward: MinerReward!
  txsFee: Capacity!
  finalizedAt: H256!
}

type FeeRateStatistics {
  mean: Uint64
  median: Uint64
}

# TODO fill the input type
#input InputTransaction {
#}

scalar InputTransaction

scalar Version
scalar Timestamp
scalar BlockNumber
scalar EpochNumberWithFraction
scalar ProposalShortId

"256-bits hash digest"
scalar H256
scalar Byte32
scalar JsonBytes
scalar Capacity

scalar Uint32
scalar Uint64
scalar Uint128
`;
