import "tailwindcss/tailwind.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/hooks/use-shopping-cart";
import { Header, Footer } from "@/components/index";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Green Living Malta Booking App</title>
        <meta name="description" content="Green Living Malta Booking App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </CartProvider>
      <Toaster />
    </SessionProvider>
  );
}

export default MyApp;
