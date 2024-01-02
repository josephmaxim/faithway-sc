import Head from 'next/head'

import 'rsuite/dist/rsuite-no-reset.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/scss/root.scss';

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      <meta name="HandheldFriendly" content="true"/>

      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>
}