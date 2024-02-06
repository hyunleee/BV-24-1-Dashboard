import { registerEnumType } from '@nestjs/graphql';

export enum ASSET_TYPE {
  TOKEN = 'TOKEN',
  NFT = 'NFT',
}

registerEnumType(ASSET_TYPE, {
  name: 'ASSET_TYPE',
  description: '자산 타입 (토큰 / NFT)',
});
