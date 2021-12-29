import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'
import client from '../graphql/client';
import { Web3Provider } from "@ethersproject/providers";
import { ApolloProvider } from "@apollo/client";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  function getLibrary(provider:any): Web3Provider {
    return new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Web3ReactProvider getLibrary={getLibrary}>
  <ApolloProvider client={client}>
  <Component {...pageProps} />
  </ApolloProvider>
  </Web3ReactProvider>
  </ThemeProvider>
  )
}

export default MyApp
