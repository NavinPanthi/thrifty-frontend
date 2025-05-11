import { Cancel01Icon } from "hugeicons-react";

function ModalCancelBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-1 top-1 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-black"
    >
      <Cancel01Icon />
    </button>
  );
}

export default ModalCancelBtn;
