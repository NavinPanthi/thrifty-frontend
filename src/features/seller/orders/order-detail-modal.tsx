import OrderDetail from "@/components/order/order-card";
import Modal from "@/components/ui/modal";

const OrderDetailModal = ({
  isOpen,
  closeModal,
  order,
}: {
  isOpen: boolean;
  closeModal: () => void;
  order: Order | null;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      className="!max-w-[800px] gap-10"
    >
      <OrderDetail order={order} />
    </Modal>
  );
};

export default OrderDetailModal;
