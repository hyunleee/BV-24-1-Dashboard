import { Field, InputType } from '@nestjs/graphql';
import { IsEthereumAddress, MaxLength } from 'class-validator';

@InputType()
export class UserInput {
  @Field(() => String, { nullable: false, description: '지갑 주소' })
  @IsEthereumAddress()
  @MaxLength(256)
  address!: string;
}
