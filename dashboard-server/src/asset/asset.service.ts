import { ErrorMessage } from '../common/error/message';
import { ASSET_TYPE } from '../common/graphql';
import { CreateAssetInput, DeleteAssetInput } from '../common/graphql';
import { ACTIVE_STATUS } from '../common/graphql/enums/active-status.enum';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@/prisma/generated/client';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Injectable()
export class AssetService {
  constructor(private readonly _prismaService: PrismaService) {}

  async createAsset(createAssetInput: CreateAssetInput) {
    const user = await this._prismaService.user.findUnique({
      where: { address: createAssetInput.userWalletAddress },
    });

    const { address, type, name, symbol, balance, decimal, baseURL } = createAssetInput;
    const { id: userId } = user;

    if (!user) throw new GraphQLError(ErrorMessage.USER_NOT_FOUND);
    if (parseInt(balance) < 0) throw new GraphQLError(ErrorMessage.INVALID_CREATE_ASSET_INPUT);
    if (type === ASSET_TYPE.TOKEN) {
      if (!decimal) throw new GraphQLError(ErrorMessage.INVALID_CREATE_ASSET_INPUT);
    } else {
      if (!baseURL) throw new GraphQLError(ErrorMessage.INVALID_CREATE_ASSET_INPUT);
    }

    const existAssetInfo = await this._prismaService.asset.findUnique({
      where: {
        address,
      },
    });

    if (existAssetInfo) {
      /* 자산이 이미 DB에 존재하는 경우 - 사용자의 잔액 데이터를 생성 또는 수정 */
      await this._prismaService.$transaction(async (prismaTransaction: Prisma.TransactionClient) => {
        await prismaTransaction.userAssetBalance.upsert({
          create: {
            userId,
            assetId: existAssetInfo.id,
            balance,
            status: ACTIVE_STATUS.ACTIVE,
          },
          update: {
            balance,
            status: ACTIVE_STATUS.ACTIVE,
          },
          where: {
            userId_assetId: {
              userId: user.id,
              assetId: existAssetInfo.id,
            },
          },
        });
      });
      return existAssetInfo;
    } else {
      /* 자산이 DB에 존재하지 않은 경우 - 자산을 DB에 추가하고 사용자의 잔액 데이터를 생성 */
      const newAssetInfo = await this._prismaService.$transaction(
        async (prismaTransaction: Prisma.TransactionClient) => {
          const createAssetTx = await prismaTransaction.asset.create({
            data: {
              address,
              type,
            },
          });
          if (createAssetInput.type === ASSET_TYPE.TOKEN) {
            await prismaTransaction.token.create({
              data: {
                assetId: createAssetTx.id,
                name,
                symbol,
                decimal,
              },
            });
          } else {
            await prismaTransaction.nft.create({
              data: {
                assetId: createAssetTx.id,
                name,
                symbol,
                baseURL,
              },
            });
          }
          await prismaTransaction.userAssetBalance.create({
            data: {
              userId,
              assetId: createAssetTx.id,
              balance,
            },
          });
          return createAssetTx;
        }
      );

      return newAssetInfo;
    }
  }

  async deleteAsset({ userWalletAddress, address }: DeleteAssetInput) {
    const { id: userId } = await this._prismaService.user.findUnique({
      where: { address: userWalletAddress },
    });
    if (!userId) throw new GraphQLError(ErrorMessage.USER_NOT_FOUND);

    const targetAsset = await this._prismaService.asset.findUnique({
      where: {
        address,
      },
    });
    if (!targetAsset) throw new GraphQLError(ErrorMessage.ASSET_NOT_FOUND);

    await this._prismaService.userAssetBalance.update({
      data: {
        status: ACTIVE_STATUS.INACTIVE,
      },
      where: {
        userId_assetId: {
          userId,
          assetId: targetAsset.id,
        },
      },
    });

    return targetAsset;
  }

  async resolveToken(assetId: string) {
    if (!assetId) return null;
    return this._prismaService.token.findUnique({
      where: {
        assetId,
      },
    });
  }

  async resolveNft(assetId: string) {
    if (!assetId) return null;
    return this._prismaService.nft.findUnique({
      where: {
        assetId,
      },
    });
  }
}
