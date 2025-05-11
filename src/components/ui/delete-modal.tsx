import Button from "./button";
import Modal from "./modal";

interface IDeleteConfirmation {
  isOpen: boolean;
  closeModal: () => void;
  handleDelete: (e: React.MouseEvent) => void;
  title?: string;
  name?: string;
  deleteButtonName?: string;
}

const DeleteConfirmationModal = (props: IDeleteConfirmation) => {
  const { isOpen, closeModal, title, name, handleDelete, deleteButtonName } =
    props;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <p className="sub-section-body mt-2 text-neutral-600">
        {title ?? "Are you sure you want to delete "}
        {name && <span className="title-body text-neutral-900">{name}</span>} ?
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="danger">
          {deleteButtonName ?? "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
