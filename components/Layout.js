import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';

import Header from '../components/Header';

const Layout = ({ children }) => {
  return (
    <Container>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      {children}
      <h1>I'm a footer</h1>
    </Container>
  );
};

export default Layout;
