import React from "react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>LearningChain</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
