import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { EtherscanModule } from '../common/etherscan/etherscan.module';

@Module({
  imports: [EtherscanModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
