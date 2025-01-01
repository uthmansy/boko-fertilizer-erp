import { useState } from "react";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

function useViewPayroll(): HookReturn {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  };
}

export default useViewPayroll; // Export the updated hook
