import { GQLOptions } from '../../gql-client.type';
import { gql } from '../__generated__/index';
import { useMutation } from '@apollo/client';

export const deleteAsset = gql(/* GraphQL */ `
  mutation DeleteAsset($input: DeleteAssetInput!) {
    deleteAsset(input: $input) {
      id
      address
      token {
        name
        symbol
        decimal
      }
      nft {
        name
        symbol
        baseURL
      }
    }
  }
`);

export const useDeleteAsset = (options?: GQLOptions<typeof deleteAsset>) => {
  return useMutation(deleteAsset, {
    ...options,
  });
};
