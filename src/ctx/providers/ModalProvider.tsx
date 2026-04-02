import { useState } from "react";
import Modal from "react-modal";
import { ModalContext } from "../contexts/ModalContext";

Modal.setAppElement("#root"); // for accessibility

export type ModalProps = { children: React.ReactNode; isOpen: boolean };

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ModalProps>({
    isOpen: false,
    children: null,
  });

  const showModal = (content: React.ReactNode) =>
    setModalState({ isOpen: true, children: content });

  const hideModal = () => setModalState({ isOpen: false, children: null });

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      <Modal
        isOpen={modalState.isOpen}
        onRequestClose={hideModal}
        // Added 'mt-20' or similar to make sure it's not hidden under a nav
        className="bg-white p-4 max-w-md max-h-[80vh] mx-auto rounded shadow-lg mt-20 outline-none"
        // Added flex centering to the overlay
        overlayClassName="fixed inset-0 bg-black/50 max-h-[70vh] flex items-center justify-center z-50"
      >
        {modalState.children}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};