import { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '../components/navbar';

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>To-Do App</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />
        </Head>
        <Navbar />
        <main className="container py-5">
            <Component {...pageProps} />
        </main>
    </>
);

export default App;
