import { useContext } from "react";
import { SessionContext } from "../ctx/contexts/SessionContext";

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be inside SessionProvider");
  return ctx;
};
