import { FetchTransactionsDto, FetchUserAssetsDto } from '../common/dtos/etherscan.dtos';
import { ErrorMessage } from '../common/error/message';
import { EtherscanService } from '../common/etherscan/etherscan.service';
import { UserInput } from '../common/graphql';
import { ASSET_TYPE } from '../common/graphql/enums/asset-type.enum';
import { PrismaService } from '../common/prisma/prisma.service';
import type { Prisma } from '@/prisma/generated/client';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Injectable()
export class UserService {
  constructor(private readonly _prismaService: PrismaService, private readonly _etherscanService: EtherscanService) {}

  async fetchUser({ address: rawAddress }: UserInput) {
    const address = rawAddress.toLowerCase();
    const { id: userId, lastUpdatedBlockNumber } = await this._prismaService.user.upsert({
      create: { address },
      update: {},
      where: { address },
    });

    // etherscan API를 통해 fetch
    const { assets, transactions, fetchBlockNumber } = await this._etherscanService.fetchEtherscanData(
      address,
      lastUpdatedBlockNumber
    );

    // 데이터베이스 업데이트
    const userInfo = await this._prismaService.$transaction(async (prismaTransaction: Prisma.TransactionClient) => {
      const userInfoTx = await prismaTransaction.user.update({
        where: { address },
        data: { lastUpdatedBlockNumber: fetchBlockNumber },
      });
      await this.upsertAssetTx(userId, assets, prismaTransaction);
      await this.upsertTransactionTx(userId, transactions, prismaTransaction);
      return userInfoTx;
    });

    return userInfo;
  }

  async upsertAssetTx(
    userId: string,
    fetchedUserAssets: FetchUserAssetsDto[],
    prismaTransaction: Prisma.TransactionClient
  ) {
    await Promise.all(
      fetchedUserAssets.map(async (fetchedUserAsset) => {
        const { address, type, balance, ...assetInfoInput } = fetchedUserAsset;
        const assetInfo = await prismaTransaction.asset.upsert({
          create: { address, type },
          update: {},
          where: {
            address,
          },
        });
        const { id: assetId } = assetInfo;

        if (type === ASSET_TYPE.TOKEN) {
          await prismaTransaction.token.upsert({
            create: { assetId, ...assetInfoInput.tokenInfo },
            update: {},
            where: {
              assetId,
            },
          });
        } else {
          await prismaTransaction.nft.upsert({
            create: { assetId, ...assetInfoInput.nftInfo },
            update: {},
            where: {
              assetId,
            },
          });
        }
        await prismaTransaction.userAssetBalance.upsert({
          create: { userId, assetId, balance },
          update: {
            balance,
          },
          where: {
            userId_assetId: {
              userId,
              assetId,
            },
          },
        });
      })
    );
  }

  async upsertTransactionTx(
    userId: string,
    fetchedUserTransactions: FetchTransactionsDto[],
    prismaTransaction: Prisma.TransactionClient
  ) {
    await prismaTransaction.transaction.createMany({
      data: fetchedUserTransactions.map((fetchedUserTransaction) => {
        return {
          userId: userId,
          ...fetchedUserTransaction,
        };
      }),
    });
  }

  async getUser({ address }: UserInput) {
    const userInfo = await this._prismaService.user.findFirst({
      where: {
        address,
      },
    });
    if (!userInfo) throw new GraphQLError(ErrorMessage.USER_NOT_FOUND);
    return userInfo;
  }

  async resolveUserAssetBalance(userId: string) {
    return this._prismaService.userAssetBalance.findMany({
      where: {
        userId,
        status: 'ACTIVE',
      },
    });
  }

  async resolveTransaction(userId: string) {
    return this._prismaService.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
}
