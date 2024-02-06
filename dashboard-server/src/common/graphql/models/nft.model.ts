import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Nft' })
export class Nft {
  @Field(() => String, { nullable: false, description: '자산 아이디' })
  assetId!: string;

  @Field(() => String, { nullable: false, description: '토큰 이름' })
  name!: string;

  @Field(() => String, { nullable: false, description: '토큰 심볼' })
  symbol!: string;

  @Field(() => String, { nullable: false, description: '토큰 baseURL' })
  baseURL!: string;
}
