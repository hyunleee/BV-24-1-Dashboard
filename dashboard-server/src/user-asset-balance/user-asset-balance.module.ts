import { Module } from '@nestjs/common';
import { UserAssetBalanceService } from './user-asset-balance.service';
import { UserAssetBalanceResolver } from './user-asset-balance.resolver';

@Module({
  providers: [UserAssetBalanceResolver, UserAssetBalanceService],
  exports: [UserAssetBalanceService],
})
export class UserAssetBalanceModule {}
