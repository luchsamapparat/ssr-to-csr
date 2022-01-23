import { useContext } from "react";
import { Links, LinksFunction, LiveReload, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration } from "remix";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { LanguageContext } from "./lib/language-context";


export const meta: MetaFunction = () => {
  return { title: "To-Do App" };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: '/global.css' },
    { rel: "stylesheet", href: '/styles.css' }
  ];
}

export default function App() {
  const language = useContext(LanguageContext);
  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="To-Do App illustrating server-side vs. client-side rendering" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📋</text></svg>"></link>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <main className="container py-5">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
