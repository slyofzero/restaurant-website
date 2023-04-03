import { Dispatch, SetStateAction, createContext, useState } from "react";

// --------------------------- Types and interfaces ---------------------------
interface ProviderProps {
  children: React.ReactNode;
}

// User interface
interface UserI {
  name?: string;
  email?: string;
}

interface ILoggedUserContext {
  loggedUser: UserI;
  setLoggedUser: Dispatch<SetStateAction<UserI>>;
}

// --------------------------- Context ---------------------------
export const LoggedUserContext = createContext<ILoggedUserContext | null>(null);

export const LoggedUserContextProvider = ({ children }: ProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<UserI>({});

  const value = { loggedUser, setLoggedUser };

  return (
    <LoggedUserContext.Provider value={value}>
      {children}
    </LoggedUserContext.Provider>
  );
};
