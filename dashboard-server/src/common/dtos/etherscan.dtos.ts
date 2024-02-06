import { ASSET_TYPE } from '../graphql/enums/asset-type.enum';
import { DIRECTION } from '../graphql/enums/direction.enum';

export class EtherscanTxApiResult {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
}

export class EtherscanTxApiRes {
  status: string;
  message: string;
  result: EtherscanTxApiResult[];
}

export class FetchUserAssetsDto {
  address: string;
  type: ASSET_TYPE;
  tokenInfo?: {
    name: string;
    symbol: string;
    decimal: number;
  };
  nftInfo?: {
    name: string;
    symbol: string;
    baseURL: string;
  };
  balance: string;
}

export class FetchTransactionsDto {
  transactionHash: string;
  targetAddress: string;
  direction: DIRECTION;
  address: string;
  amount: string;
  timestamp: number;
}

export class EtherscanFetchDto {
  assets: FetchUserAssetsDto[];
  transactions: FetchTransactionsDto[];
  fetchBlockNumber: number;
}
