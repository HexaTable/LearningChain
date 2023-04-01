/* eslint-disable react/react-in-jsx-scope*/
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import '../globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <h1 className="text-sm cursor-pointer font-bold underline">
        Hello world!
      </h1>
    </SessionProvider>
  );
};

export default App;
