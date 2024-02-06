import Main from '@/components/layouts/Main';
import GlobalStateContext from '@/store/GlobalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Web3OnboardProvider } from '@web3-onboard/react';
import { web3Onboard } from '@/libs/web3-onboard.config';
import { ApolloProvider } from '@apollo/client';
import { useGraphqlClient } from '@graphql/client';

import '@/styles/colors.scss';
import '@/styles/_fonts.scss';
import '@/styles/_reset.scss';

export default function App({ Component, pageProps }: AppProps) {
  const client = useGraphqlClient();
  const queryClient = new QueryClient();

  return (
    <>
      <ApolloProvider client={client}>
        <Web3OnboardProvider web3Onboard={web3Onboard}>
          <QueryClientProvider client={queryClient}>
            <GlobalStateContext>
              <Main>
                <Component {...pageProps} />
              </Main>
            </GlobalStateContext>
          </QueryClientProvider>
        </Web3OnboardProvider>
      </ApolloProvider>
    </>
  );
}
