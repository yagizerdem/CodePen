import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "@/Context/AppContext";
import { Inter, Sedan } from "next/font/google";
import Head from "next/head";

// If loading a variable font, you don't need to specify the font weight
const inter = Sedan({ subsets: ["latin"], weight: "400" });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
            crossorigin="anonymous"
          ></link>
        </Head>
        <main className={inter.className}>
          <Component {...pageProps} />
          <ToastContainer></ToastContainer>
        </main>
      </AppProvider>
    </SessionProvider>
  );
}
