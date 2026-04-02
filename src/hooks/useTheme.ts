import { useContext } from "react";
import { ThemeContext } from "../ctx/contexts/ThemeContext";

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be in ThemeProvider");
  return ctx;
};
