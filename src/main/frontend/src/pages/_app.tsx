import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../../styles/global.css';
import '../../styles/styles.css';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>To-Do App</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="To-Do App illustrating server-side vs. client-side rendering" />
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📋</text></svg>"></link>
        </Head>
        <Navbar />
        <main className="container py-5">
            <Component {...pageProps} />
        </main>
        <Footer />
    </>
);

export default App;
