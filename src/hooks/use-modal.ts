import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal: () => void = () => setIsOpen(false);
  const openModal: () => void = () => setIsOpen(true);

  return [isOpen, closeModal, openModal] as const;
};

export default useModal;
