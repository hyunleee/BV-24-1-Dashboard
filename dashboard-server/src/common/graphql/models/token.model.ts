import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '토큰' })
export class Token {
  @Field(() => String, { nullable: false, description: '자산 아이디' })
  assetId!: string;

  @Field(() => String, { nullable: false, description: '토큰 이름' })
  name!: string;

  @Field(() => String, { nullable: false, description: '토큰 심볼' })
  symbol!: string;

  @Field(() => Int, { nullable: false, description: '토큰 소수점 자리수' })
  decimal!: number;
}
