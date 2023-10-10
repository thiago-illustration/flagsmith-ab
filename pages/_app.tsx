import { useEffect } from "react";
import { AppProps } from "next/app";

import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith from 'flagsmith/isomorphic';
import { IState } from "flagsmith/types";

import { v4 as uuidv4 } from "uuid"

type MyAppProps = AppProps & {
  flagsmithState: IState
}

const UUID_STORAGE_KEY = "UUID"

function MyApp({ Component, pageProps, flagsmithState }: MyAppProps) {
  useEffect(() => {
    const uuid = localStorage.getItem(UUID_STORAGE_KEY) || uuidv4()

    flagsmith.identify(uuid)
    localStorage.setItem(UUID_STORAGE_KEY, uuid)
  }, [])

  return (
    <FlagsmithProvider flagsmith={flagsmith} serverState={flagsmithState}>
      <Component {...pageProps} />
    </FlagsmithProvider>
  );
}

MyApp.getInitialProps = async () => {
  await flagsmith.init({
    environmentID: process.env.FLAGSMITH_ID || "",
  });

  return { flagsmithState: flagsmith.getState() };
};

export default MyApp;