import Drawer from "@/components/ui/drawer";

import AddProductForm from "./add-product-form";

const RegisterProductDrawer = ({
  isOpen,
  toggleDrawer,
}: {
  isOpen: boolean;
  toggleDrawer: () => void;
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      toggleDrawer={toggleDrawer}
      className="!max-w-[800px] gap-10"
    >
      <AddProductForm toggleDrawer={toggleDrawer} />
    </Drawer>
  );
};

export default RegisterProductDrawer;
