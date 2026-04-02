import { useContext } from "react";
import { ModalContext } from "../ctx/contexts/ModalContext";

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be in ModalProvider");
  return ctx;
};