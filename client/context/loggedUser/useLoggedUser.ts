import { useContext } from "react";
import { LoggedUserContext } from "./LoggedUserContext";

export default function useLoggedUser() {
  const loggedUserContext = useContext(LoggedUserContext);

  if (!loggedUserContext) {
    throw Error("Missing logged user context");
  }

  return loggedUserContext;
}
