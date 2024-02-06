/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateAsset($input: CreateAssetInput!) {\n    createAsset(input: $input) {\n      id\n      address\n      token {\n        name\n        symbol\n        decimal\n      }\n      nft {\n        name\n        symbol\n        baseURL\n      }\n    }\n  }\n": types.CreateAssetDocument,
    "\n  mutation DeleteAsset($input: DeleteAssetInput!) {\n    deleteAsset(input: $input) {\n      id\n      address\n      token {\n        name\n        symbol\n        decimal\n      }\n      nft {\n        name\n        symbol\n        baseURL\n      }\n    }\n  }\n": types.DeleteAssetDocument,
    "\n  mutation FetchUser($input: UserInput!) {\n    fetchUser(input: $input) {\n      address\n      createdAt\n      id\n      lastUpdatedBlockNumber\n      updatedAt\n      transactions {\n        address\n        asset {\n          address\n          token {\n            name\n            symbol\n          }\n          nft {\n            name\n            symbol\n          }\n        }\n        amount\n        timestamp\n        direction\n        id\n        targetAddress\n        transactionHash\n        userId\n      }\n      userAssetBalances {\n        asset {\n          address\n          token {\n            name\n            symbol\n          }\n          nft {\n            name\n            symbol\n          }\n        }\n        balance\n      }\n    }\n  }\n": types.FetchUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateAsset($input: CreateAssetInput!) {\n    createAsset(input: $input) {\n      id\n      address\n      token {\n        name\n        symbol\n        decimal\n      }\n      nft {\n        name\n        symbol\n        baseURL\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAsset($input: CreateAssetInput!) {\n    createAsset(input: $input) {\n      id\n      address\n      token {\n        name\n        symbol\n        decimal\n      }\n      nft {\n        name\n        symbol\n        baseURL\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteAsset($input: DeleteAssetInput!) {\n    deleteAsset(input: $input) {\n      id\n      address\n      token {\n        name\n        symbol\n        decimal\n      }\n      nft {\n        name\n        symbol\n        baseURL\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteAsset($input: DeleteAssetInput!) {\n    deleteAsset(input: $input) {\n      id\n      address\n      token {\n        name\n        symbol\n        decimal\n      }\n      nft {\n        name\n        symbol\n        baseURL\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation FetchUser($input: UserInput!) {\n    fetchUser(input: $input) {\n      address\n      createdAt\n      id\n      lastUpdatedBlockNumber\n      updatedAt\n      transactions {\n        address\n        asset {\n          address\n          token {\n            name\n            symbol\n          }\n          nft {\n            name\n            symbol\n          }\n        }\n        amount\n        timestamp\n        direction\n        id\n        targetAddress\n        transactionHash\n        userId\n      }\n      userAssetBalances {\n        asset {\n          address\n          token {\n            name\n            symbol\n          }\n          nft {\n            name\n            symbol\n          }\n        }\n        balance\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation FetchUser($input: UserInput!) {\n    fetchUser(input: $input) {\n      address\n      createdAt\n      id\n      lastUpdatedBlockNumber\n      updatedAt\n      transactions {\n        address\n        asset {\n          address\n          token {\n            name\n            symbol\n          }\n          nft {\n            name\n            symbol\n          }\n        }\n        amount\n        timestamp\n        direction\n        id\n        targetAddress\n        transactionHash\n        userId\n      }\n      userAssetBalances {\n        asset {\n          address\n          token {\n            name\n            symbol\n          }\n          nft {\n            name\n            symbol\n          }\n        }\n        balance\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;