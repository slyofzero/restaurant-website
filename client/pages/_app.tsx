import { AuthAlertContextProvider } from "../context/AuthAlert/AuthAlertContext";
import { LoggedUserContextProvider } from "../context/LoggedUser/LoggedUserContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthAlertContextProvider>
      <LoggedUserContextProvider>
        <Component {...pageProps} />
      </LoggedUserContextProvider>
    </AuthAlertContextProvider>
  );
}

export default MyApp;

// App constants
export const SERVER_URL = "http://localhost:3501";
export const orgName = "Lorem";
