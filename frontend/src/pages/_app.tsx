import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from 'next-themes';
import { TransactionProvider } from "@/context/transactionContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TransactionProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </TransactionProvider>
  );
}
