import { TokenTransferStatus } from '@/libs/types';
import { UserAssetsContext, UserTransactionsContext } from '@/store/GlobalContext';
import { UserAssets, UserTransactions } from '@/store/GlobalContext.d';
import { FetchUserRes } from '@graphql/client';
import { useCallback, useContext } from 'react';

export default function useUpdateUserInfo() {
  const [, setUserAssetContext] = useContext(UserAssetsContext);
  const [, setUserTransactionContext] = useContext(UserTransactionsContext);

  const clearUserInfo = useCallback(() => {
    setUserAssetContext([]);
    setUserTransactionContext([]);
  }, [setUserAssetContext, setUserTransactionContext]);

  const updateUserInfo = useCallback(
    (userInfo: FetchUserRes | null) => {
      if (!userInfo) {
        clearUserInfo();
      } else {
        const userAssets: UserAssets = userInfo?.userAssetBalances.map((userAssetBalance) => {
          return {
            assetInfo: {
              address: userAssetBalance.asset.address!,
              name: userAssetBalance.asset.token?.name! || userAssetBalance.asset.nft?.name!,
              symbol: userAssetBalance.asset.token?.symbol! || userAssetBalance.asset.nft?.symbol!,
            },
            balance: userAssetBalance.balance!,
          };
        });

        const userTransactions: UserTransactions = userInfo?.transactions.map((transaction) => {
          return {
            transactionHash: transaction.transactionHash!,
            assetInfo: {
              address: transaction.asset.address!,
              name: transaction.asset.token?.name! || transaction.asset.nft?.name!,
              symbol: transaction.asset.token?.symbol! || transaction.asset.nft?.symbol!,
            },
            targetAddress: transaction.targetAddress!,
            status: transaction.direction === 'SEND' ? TokenTransferStatus.WITHDRAW : TokenTransferStatus.DEPOSIT,
            transferAmount: transaction.amount!,
            timestamp: transaction.timestamp!,
          };
        });

        setUserAssetContext(userAssets);
        setUserTransactionContext(userTransactions);
      }
    },
    [clearUserInfo, setUserAssetContext, setUserTransactionContext]
  );

  return {
    updateUserInfo,
    clearUserInfo,
  };
}
