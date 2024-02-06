import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import configSetting from './common/config/config';
import { GqlConfigService } from './common/config/gql-config.service';
import { EtherscanModule } from './common/etherscan/etherscan.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserAssetBalanceModule } from './user-asset-balance/user-asset-balance.module';
import { UserModule } from './user/user.module';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configSetting],
      isGlobal: true,
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    PrismaModule,
    UserModule,
    UserAssetBalanceModule,
    AssetModule,
    TransactionModule,
    EtherscanModule,
  ],
  controllers: [AppController],
  providers: [AppService, GqlConfigService],
})
export class AppModule {}
