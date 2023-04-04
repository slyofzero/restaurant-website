import { Dispatch, SetStateAction, createContext, useState } from "react";

// --------------------------- Types and interfaces ---------------------------
interface ProviderProps {
  children: React.ReactNode;
}

interface IAlert {
  alert: string;
  setAlert: Dispatch<SetStateAction<string>>;
}

export const AuthAlertContext = createContext<IAlert | null>(null);

export const AuthAlertContextProvider = ({ children }: ProviderProps) => {
  const [alert, setAlert] = useState("");

  const value: IAlert = { alert, setAlert };

  return (
    <AuthAlertContext.Provider value={value}>
      {children}
    </AuthAlertContext.Provider>
  );
};
