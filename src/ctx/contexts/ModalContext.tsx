import React, { createContext } from "react";



export const ModalContext = createContext<{
  showModal: (content: React.ReactNode) => void;
  hideModal: () => void;
} | null>(null);




