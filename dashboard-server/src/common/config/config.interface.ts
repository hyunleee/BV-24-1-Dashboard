export interface ConfigType {
  nest: NestConfig;
  graphql: GraphqlConfig;
  ethereum: EthereumConfig;
}

export interface NestConfig {
  environment: string | undefined;
  port: number;
  clientDomain: string | undefined;
  databaseUrl: string | undefined;
  readOnlyDatabaseUrl: string | undefined;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean | undefined;
  schemaDestination: string | undefined;
  sortSchema: boolean | undefined;
}

export interface EthereumConfig {
  etherscanUrl: string | undefined;
  etherscanApiKey: string | undefined;
  rpcUrl: string | undefined;
}
