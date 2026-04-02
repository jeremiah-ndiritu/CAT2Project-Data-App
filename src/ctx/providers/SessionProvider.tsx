import { useState,  } from "react";
import type { User } from "../../types";
import { SessionContext } from "../contexts/SessionContext";




export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};


