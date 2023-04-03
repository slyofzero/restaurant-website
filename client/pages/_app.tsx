import { LoggedUserContextProvider } from "../context/loggedUser/LoggedUserContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoggedUserContextProvider>
      <Component {...pageProps} />
    </LoggedUserContextProvider>
  );
}

export default MyApp;

// App constants
export const SERVER_URL = "http://localhost:3507";
export const orgName = "Lorem";
