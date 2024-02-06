import { Field, InputType } from '@nestjs/graphql';
import { IsEthereumAddress, MaxLength } from 'class-validator';

@InputType()
export class DeleteAssetInput {
  @Field(() => String, { nullable: false, description: '지갑 주소' })
  @IsEthereumAddress()
  @MaxLength(256)
  userWalletAddress!: string;

  @Field(() => String, { nullable: false, description: '자산 주소' })
  @IsEthereumAddress()
  @MaxLength(256)
  address!: string;
}
