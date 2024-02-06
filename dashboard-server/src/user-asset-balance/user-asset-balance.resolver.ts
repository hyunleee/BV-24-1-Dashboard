import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserAssetBalance } from '../common/graphql/models/user-asset-balance.model';
import { UserAssetBalanceService } from './user-asset-balance.service';
import { Asset } from '../common/graphql/models/asset.model';

@Resolver(() => UserAssetBalance)
export class UserAssetBalanceResolver {
  constructor(
    private readonly _userAssetBalanceService: UserAssetBalanceService,
  ) {}

  @ResolveField('asset', () => Asset)
  async resolveAsset(@Parent() userAssetBalance: UserAssetBalance) {
    return this._userAssetBalanceService.resolveAsset(userAssetBalance.assetId);
  }
}
