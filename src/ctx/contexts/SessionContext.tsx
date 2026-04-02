import {createContext} from "react";
import type { User } from "../../types";

type Session = { user: User | null; setUser: (u: User | null) => void };

export const SessionContext = createContext<Session | undefined>(undefined);
