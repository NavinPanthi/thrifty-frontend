import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

import { resetLogin } from "@/redux/slices/user-slice";

import Button from "../ui/button";
import Modal from "../ui/modal";

const LogoutModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    queryClient.removeQueries();
    dispatch(resetLogin());
    toast.success("user logout successfully");
    navigate("/");
  };
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      className="!max-w-[480px] gap-10"
    >
      <div className="flex flex-col justify-between gap-10">
        <div>
          <p className="title-section text-neutral-800">Log out </p>
          <p className="body-default mt-1 text-neutral-500">
            Are you sure want to log out ?
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex justify-end gap-4">
            <Button
              variant="tertiary"
              onClick={closeModal}
              className="w-full"
              rounded="full"
            >
              Cancel
            </Button>
            <button className="del-btn" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
