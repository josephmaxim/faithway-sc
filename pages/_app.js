import Head from 'next/head'
import { ReactNotifications } from 'react-notifications-component'
import UserProvider from '@/context/UserContext'

import '@/scss/root.scss';

export default function App({ Component, pageProps }) {
  return <UserProvider>
    <Head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      <meta name="HandheldFriendly" content="true"/>
      <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
    </Head>
    <ReactNotifications className="react-notify"/>
    <Component {...pageProps} />
  </UserProvider>
}