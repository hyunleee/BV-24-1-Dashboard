import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetResolver } from './asset.resolver';

@Module({
  providers: [AssetResolver, AssetService],
  exports: [AssetService],
})
export class AssetModule {}
