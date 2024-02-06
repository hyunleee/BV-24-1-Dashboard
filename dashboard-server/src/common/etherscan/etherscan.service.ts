import { EthereumConfig } from '../config/config.interface';
import { EtherscanFetchDto, EtherscanTxApiRes, FetchTransactionsDto, FetchUserAssetsDto } from '../dtos/etherscan.dtos';
import { ErrorMessage } from '../error/message';
import { ASSET_TYPE } from '../graphql/enums/asset-type.enum';
import { DIRECTION } from '../graphql/enums/direction.enum';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { BigNumber, ethers } from 'ethers';
import { GraphQLError } from 'graphql';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class EtherscanService {
  private readonly logger = new Logger(EtherscanService.name);
  private readonly provider: ethers.providers.JsonRpcProvider;

  constructor(private readonly _httpService: HttpService, private readonly _configService: ConfigService) {
    const { rpcUrl } = this._configService.get<EthereumConfig>('ethereum');
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl) as ethers.providers.JsonRpcProvider;
  }

  async fetchFromEtherscan(walletAddress: string, lastBlockNumber: number) {
    const { etherscanUrl, etherscanApiKey } = this._configService.get<EthereumConfig>('ethereum');
    const latestBlockNumber = await this.provider.getBlockNumber();

    const { data } = await firstValueFrom(
      this._httpService
        .get<EtherscanTxApiRes>(etherscanUrl, {
          params: {
            module: 'account',
            action: 'tokentx',
            address: walletAddress,
            page: 1,
            offset: 100,
            startblock: lastBlockNumber + 1,
            endblock: latestBlockNumber,
            sort: 'asc',
            apikey: etherscanApiKey,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw new GraphQLError(ErrorMessage.ETHERSCAN_FETCH_FAILED);
          })
        )
    );

    return { etherscanRawData: data };
  }

  async fetchEtherBalance(walletAddress: string) {
    const etherAsset = {
      address: ethers.constants.AddressZero,
      type: ASSET_TYPE.TOKEN,
      tokenInfo: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimal: 18,
      },
      balance: ethers.utils.formatUnits(await this.provider.getBalance(walletAddress), BigNumber.from(18)),
    };
    return etherAsset;
  }

  async fetchEtherscanData(walletAddress: string, lastBlockNumber: number): Promise<EtherscanFetchDto> {
    const startBlockNumber = lastBlockNumber ? lastBlockNumber : 0;
    const { etherscanRawData } = await this.fetchFromEtherscan(walletAddress, startBlockNumber);

    const assets: FetchUserAssetsDto[] = [];
    const transactions: FetchTransactionsDto[] = [];

    assets.push(await this.fetchEtherBalance(walletAddress));

    if (etherscanRawData.status === '0') {
      if (etherscanRawData.message === 'No transactions found') {
        return {
          assets,
          transactions,
          fetchBlockNumber: startBlockNumber,
        };
      } else {
        this.logger.log(etherscanRawData.result);
        throw new GraphQLError(ErrorMessage.ETHERSCAN_FETCH_FAILED);
      }
    }

    const { result } = etherscanRawData;
    /*
      pending 상태의 트랜잭션이 있을 경우, 마지막 blockNumber가 가장 최신이 아닐 수 있음
      마지막으로 발견한 트랜잭션의 블록 넘버를 latestBlockNumber로 관리
    */
    const latestBlockNumber = parseInt(result[result.length - 1].blockNumber);

    result.map((rawTxData) => {
      const { hash, from, contractAddress, to, value, tokenName, tokenSymbol, tokenDecimal, timeStamp } = rawTxData;
      const direction = walletAddress.toLowerCase() === to.toLowerCase() ? DIRECTION.RECEIVE : DIRECTION.SEND;
      const decimal = Number(tokenDecimal) !== 0 ? Number(tokenDecimal) : 18;

      transactions.push({
        transactionHash: hash.toLowerCase(),
        targetAddress: direction === DIRECTION.RECEIVE ? from : to,
        direction,
        address: contractAddress.toLowerCase(),
        amount: ethers.utils.formatUnits(value, decimal),
        timestamp: parseInt(timeStamp),
      });
      assets.push({
        address: contractAddress.toLowerCase(),
        type: ASSET_TYPE.TOKEN,
        tokenInfo: {
          name: tokenName ? tokenName : 'Unknown Token',
          symbol: tokenSymbol ? tokenSymbol : 'UNKNOWN',
          decimal: Number(tokenDecimal) !== 0 ? Number(tokenDecimal) : 18,
        },
        balance: '0.0',
      });
    });

    // TODO: 라이브러리로 빼기
    const ERC20_ABI = ['function balanceOf(address) view returns (uint)'];

    await Promise.all(
      assets
        .filter((asset) => asset.address !== ethers.constants.AddressZero)
        .map(async (asset) => {
          const { address } = asset;
          const tokenContract = new ethers.Contract(address, ERC20_ABI, this.provider);
          const balance = await tokenContract.balanceOf(walletAddress);
          asset.balance = ethers.utils.formatUnits(balance, asset.tokenInfo.decimal);
        })
    );

    return {
      assets,
      transactions,
      fetchBlockNumber: latestBlockNumber,
    };
  }
}
