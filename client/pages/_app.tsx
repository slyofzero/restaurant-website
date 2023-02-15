import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

export const SERVER_URL = "http://localhost:3507";
export const schoolName = "Oggie";
