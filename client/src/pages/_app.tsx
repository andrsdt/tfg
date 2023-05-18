import { ToastManager } from '@/components/Elements/Toast';
import { PhoneLayout } from '@/components/Layouts';
import { API_URL, GOOGLE_MAPS_API_KEY } from '@/config';
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
        <meta name="msapplication-TileColor" content={COLORS.green} />
        <meta name="description" content="Del campo a tu casa" />
        <meta name="keywords" content="marketplace" />
        <title>Grocerin</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/metadata/apple-touch-icon.png"
        />
        <link
          href="/metadata/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/metadata/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        {/* TODO: take the api key somewhere so it doesn't */}
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
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
        <meta property="og:url" content="/" />
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
