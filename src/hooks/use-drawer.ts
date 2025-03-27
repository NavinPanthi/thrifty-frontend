import { useState } from "react";

const useDrawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeDrawer: () => void = () => setIsOpen(false);
  const openDrawer: () => void = () => setIsOpen(true);

  return [isOpen, openDrawer, closeDrawer] as const;
};

export default useDrawer;
