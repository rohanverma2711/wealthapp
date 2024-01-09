import { Fragment } from "react";
import Head from "next/head";
import "./global.css";
import Captcha from "./captcha";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>wealthup app</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
      <Captcha />
    </Fragment>
  );
}

export default MyApp;
