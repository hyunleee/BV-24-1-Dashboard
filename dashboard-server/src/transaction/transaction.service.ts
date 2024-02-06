import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly _prismaService: PrismaService) {}

  async resolveAsset(address: string) {
    if (!address) return null;
    return this._prismaService.asset.findUnique({
      where: {
        address,
      },
    });
  }
}
