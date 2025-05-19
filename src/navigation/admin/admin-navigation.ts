import {
  BarCode01Icon,
  HugeiconsProps,
  UserAccountIcon,
} from "hugeicons-react";

export interface INavigation {
  id: string;
  name: string;
  path: string;
  icon: React.FC<HugeiconsProps> | string;
}

export const adminLinks: INavigation[] = [
  {
    id: "Products",
    name: "Products",
    path: "/admin/products",
    icon: BarCode01Icon,
  },

  {
    id: "Users",
    name: "Users",
    path: "/admin/users",
    icon: UserAccountIcon,
  },
];
