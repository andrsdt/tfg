import { PhoneLayout } from '@/components/Layouts';
import { ToastManager } from '@/components/Notifications';
import { API_URL } from '@/config';
import { COLORS } from '@/constants';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

const MyApp = ({ Component, router, ...pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,viewport-fit=cover,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="theme-color" content={COLORS.green} />
        <meta name="msapplication-TileColor" content={ COLORS.green } />
        <meta name="description" content="Del campo a tu casa" />
        <meta name="keywords" content="marketplace" />
        <title>Grocerin</title>
        <link rel="manifest" href={`${API_URL}/manifest.json`} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${API_URL}/metadata/apple-touch-icon.png`}
        />
        <link
          href={`${API_URL}/metadata/favicon-16x16.png`}
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href={`${API_URL}/metadata/favicon-32x32.png`}
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        {/* Avoid black notch in iOS devices */}
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta property="og:title" content="Grocerin" />
        <meta
          property="og:description"
          content="Compra y vende alimentos del campo de forma fácil y segura."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={API_URL} />
        <meta property="og:image" content={`${API_URL}/api/og`} />
        <meta property="og:site_name" content="Grocerin" />
        <meta property="og:locale" content="es_ES" />
      </Head>
      <PhoneLayout key={router.asPath}>
        <ToastManager />
        <Component {...pageProps} />
      </PhoneLayout>
    </>
  );
};

export default MyApp;

