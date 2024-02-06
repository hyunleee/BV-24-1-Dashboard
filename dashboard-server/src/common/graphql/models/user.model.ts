import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '사용자' })
export class User {
  @Field(() => ID, { nullable: false, description: '아이디' })
  id!: string;

  @Field(() => String, { nullable: false, description: '이메일' })
  address!: string;

  @Field(() => Number, {
    nullable: false,
    description: '마지막 업데이트된 블록 넘버',
  })
  lastUpdatedBlockNumber?: number;

  @Field(() => Date, { nullable: false, description: '생성 일시' })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: '수정 일시' })
  updatedAt!: Date;
}
