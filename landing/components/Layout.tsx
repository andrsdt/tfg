import React, { ReactNode } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Navigation from './Navigation';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Grocerin' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#fff7e3" />
      <meta
        name="description"
        content="Compra y vende productos frescos del campo sin intermediarios ni comisiones 🥬"
      />
      <meta property="og:title" content="Grocerin" />
      <meta
        property="og:description"
        content="Compra y vende productos frescos del campo sin intermediarios ni comisiones 🥬"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://grocerin.vercel" />
      <meta property="og:image" content="https://grocerin.vercel.app/api/og" />
      <meta property="og:site_name" content="Grocerin" />
      <meta property="og:locale" content="es_ES" />

      <link rel="shortcut icon" href="/assets/favicon.ico" />
    </Head>
    <Navigation />
    {children}
    <Footer />
  </div>
);

export default Layout;
