import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class UserAssetBalanceService {
  constructor(private readonly _prismaService: PrismaService) {}

  async resolveAsset(assetId: string) {
    if (!assetId) return null;
    return this._prismaService.asset.findUnique({
      where: {
        id: assetId,
      },
    });
  }
}
