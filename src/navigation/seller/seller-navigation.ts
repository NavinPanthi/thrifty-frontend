import { BarCode01Icon, ClipboardIcon, HugeiconsProps } from "hugeicons-react";

export interface INavigation {
  id: string;
  name: string;
  path: string;
  icon: React.FC<HugeiconsProps> | string;
}

export const sellerLinks: INavigation[] = [
  {
    id: "Products",
    name: "Products",
    path: "/seller/products",
    icon: BarCode01Icon,
  },

  {
    id: "Orders",
    name: "Orders",
    path: "/seller/orders",
    icon: ClipboardIcon,
  },
];
