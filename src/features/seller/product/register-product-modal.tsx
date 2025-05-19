import Modal from "@/components/ui/modal";

import AddProductForm from "./add-product-form";

const RegisterProductModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      className="!max-w-[800px] gap-10"
    >
      <AddProductForm closeModal={closeModal} />
    </Modal>
  );
};

export default RegisterProductModal;
