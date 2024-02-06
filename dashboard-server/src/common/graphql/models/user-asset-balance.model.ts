import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '사용자의 자산 정보' })
export class UserAssetBalance {
  @Field(() => String, { nullable: false, description: '사용자 아이디' })
  userId!: string;

  @Field(() => String, { nullable: false, description: '자산 아이디' })
  assetId!: string;

  @Field(() => String, { nullable: false, description: '사용자 잔고' })
  balance!: string;

  @Field(() => Date, { nullable: false, description: '생성 일시' })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: '수정 일시' })
  updatedAt!: Date;
}
