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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** 자산 타입 (토큰 / NFT) */
export type Asset_Type =
  | 'NFT'
  | 'TOKEN';

/** 자산 */
export type Asset = {
  /** 주소 */
  address: Scalars['String']['output'];
  /** 생성 일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 자산 아이디 */
  id: Scalars['String']['output'];
  /** NFT 정보 */
  nft?: Maybe<Nft>;
  /** 토큰 정보 */
  token?: Maybe<Token>;
  /** 자산 타입 */
  type: Asset_Type;
  /** 수정 일시 */
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAssetInput = {
  /** 자산 주소 */
  address: Scalars['String']['input'];
  /** 자산 심볼 */
  balance: Scalars['String']['input'];
  /** 자산 데이터 URL */
  baseURL?: InputMaybe<Scalars['Int']['input']>;
  /** 자산 소수점 자리수 */
  decimal?: InputMaybe<Scalars['Int']['input']>;
  /** 자산 이름 */
  name: Scalars['String']['input'];
  /** 자산 심볼 */
  symbol: Scalars['String']['input'];
  /** 자산 타입 */
  type: Asset_Type;
  /** 지갑 주소 */
  userWalletAddress: Scalars['String']['input'];
};

/** 입금 또는 출금 여부 */
export type Direction =
  | 'RECEIVE'
  | 'SEND';

export type DeleteAssetInput = {
  /** 자산 주소 */
  address: Scalars['String']['input'];
  /** 지갑 주소 */
  userWalletAddress: Scalars['String']['input'];
};

export type Mutation = {
  /** 자산 생성 */
  createAsset: Asset;
  /** 자산 생성 */
  deleteAsset: Asset;
  fetchUser: User;
};


export type MutationCreateAssetArgs = {
  input: CreateAssetInput;
};


export type MutationDeleteAssetArgs = {
  input: DeleteAssetInput;
};


export type MutationFetchUserArgs = {
  input: UserInput;
};

/** Nft */
export type Nft = {
  /** 자산 아이디 */
  assetId: Scalars['String']['output'];
  /** 토큰 baseURL */
  baseURL: Scalars['String']['output'];
  /** 토큰 이름 */
  name: Scalars['String']['output'];
  /** 토큰 심볼 */
  symbol: Scalars['String']['output'];
};

export type Query = {
  getUser: User;
};


export type QueryGetUserArgs = {
  input: UserInput;
};

/** 토큰 */
export type Token = {
  /** 자산 아이디 */
  assetId: Scalars['String']['output'];
  /** 토큰 소수점 자리수 */
  decimal: Scalars['Int']['output'];
  /** 토큰 이름 */
  name: Scalars['String']['output'];
  /** 토큰 심볼 */
  symbol: Scalars['String']['output'];
};

/** 트랜잭션 */
export type Transaction = {
  /** 자산 주소 */
  address: Scalars['String']['output'];
  /** 트랜잭션 자산 수량 */
  amount: Scalars['String']['output'];
  /** 자산 정보 */
  asset: Asset;
  /** 생성 일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 입금 또는 출금 여부 */
  direction: Direction;
  /** 트랜잭션 아이디 */
  id: Scalars['ID']['output'];
  /** 거래 대상 */
  targetAddress: Scalars['String']['output'];
  /** 발생 타임스탬프 */
  timestamp: Scalars['Int']['output'];
  /** 트랜잭션 해시 */
  transactionHash: Scalars['String']['output'];
  /** 수정 일시 */
  updatedAt: Scalars['DateTime']['output'];
  /** 사용자 아이디 */
  userId: Scalars['String']['output'];
};

/** 사용자 */
export type User = {
  /** 이메일 */
  address: Scalars['String']['output'];
  /** 생성 일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 아이디 */
  id: Scalars['ID']['output'];
  /** 마지막 업데이트된 블록 넘버 */
  lastUpdatedBlockNumber: Scalars['Int']['output'];
  transactions: Array<Transaction>;
  /** 수정 일시 */
  updatedAt: Scalars['DateTime']['output'];
  userAssetBalances: Array<UserAssetBalance>;
};

/** 사용자의 자산 정보 */
export type UserAssetBalance = {
  asset: Asset;
  /** 자산 아이디 */
  assetId: Scalars['String']['output'];
  /** 사용자 잔고 */
  balance: Scalars['String']['output'];
  /** 생성 일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 수정 일시 */
  updatedAt: Scalars['DateTime']['output'];
  /** 사용자 아이디 */
  userId: Scalars['String']['output'];
};

export type UserInput = {
  /** 지갑 주소 */
  address: Scalars['String']['input'];
};

export type CreateAssetMutationVariables = Exact<{
  input: CreateAssetInput;
}>;


export type CreateAssetMutation = { createAsset: { id: string, address: string, token?: { name: string, symbol: string, decimal: number } | null, nft?: { name: string, symbol: string, baseURL: string } | null } };

export type DeleteAssetMutationVariables = Exact<{
  input: DeleteAssetInput;
}>;


export type DeleteAssetMutation = { deleteAsset: { id: string, address: string, token?: { name: string, symbol: string, decimal: number } | null, nft?: { name: string, symbol: string, baseURL: string } | null } };

export type FetchUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type FetchUserMutation = { fetchUser: { address: string, createdAt: any, id: string, lastUpdatedBlockNumber: number, updatedAt: any, transactions: Array<{ address: string, amount: string, timestamp: number, direction: Direction, id: string, targetAddress: string, transactionHash: string, userId: string, asset: { address: string, token?: { name: string, symbol: string } | null, nft?: { name: string, symbol: string } | null } }>, userAssetBalances: Array<{ balance: string, asset: { address: string, token?: { name: string, symbol: string } | null, nft?: { name: string, symbol: string } | null } }> } };


export const CreateAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAssetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"baseURL"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAssetMutation, CreateAssetMutationVariables>;
export const DeleteAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteAssetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"baseURL"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteAssetMutation, DeleteAssetMutationVariables>;
export const FetchUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FetchUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdatedBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"targetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userAssetBalances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]}}]} as unknown as DocumentNode<FetchUserMutation, FetchUserMutationVariables>;