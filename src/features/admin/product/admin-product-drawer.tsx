import { XMarkIcon } from "@heroicons/react/24/outline";

import ProductDetail from "@/components/product/product-detail";
import Drawer from "@/components/ui/drawer";

export interface IDrawerProductProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  children?: React.ReactNode;
  className?: string;
  size?: number;
  selectedProduct?: Product;
}

function AdminProductDrawer({
  isOpen,
  toggleDrawer,
  selectedProduct,
}: IDrawerProductProps) {
  return (
    <Drawer size={500} isOpen={isOpen} toggleDrawer={toggleDrawer}>
      {!!selectedProduct && (
        <ProductDetail
          className="container mx-auto px-4 py-10"
          productId={selectedProduct.id}
          containerClassName="grid grid-cols-1 md:!grid-cols-1"
          verifyButton={true}
          toggleDrawer={toggleDrawer}
        />
      )}
    </Drawer>
  );
}

export default AdminProductDrawer;
