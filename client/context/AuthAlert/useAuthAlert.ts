import { useContext } from "react";
import { AuthAlertContext } from "./AuthAlertContext";

export default function useAuthAlert() {
  const authAlertContext = useContext(AuthAlertContext);

  if (!authAlertContext) {
    throw Error("Missing logged user context");
  }

  return authAlertContext;
}
