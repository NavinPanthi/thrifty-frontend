import { lazy } from "react";

import SellerProductsPage from "@/pages/seller/products";
import SellerProfilePage from "@/pages/seller/profile";

const Dashboard = lazy(() => import("@/pages/seller/dashboard"));

interface ISellerRoutes {
  id: string;
  path: string;
  component: React.FC;
  meta?: {
    sellerLayout?: boolean;
    privateRoute?: boolean;
  };
}
const SellerRoutes: ISellerRoutes[] = [
  {
    id: "dashboard",
    path: "/seller-dashboard",
    component: Dashboard,
    meta: {
      sellerLayout: true,
      privateRoute: true,
    },
  },
  {
    id: "dashboard",
    path: "/seller/products",
    component: SellerProductsPage,
    meta: {
      sellerLayout: true,
      privateRoute: true,
    },
  },
  {
    id: "dashboard",
    path: "/seller/orders",
    component: Dashboard,
    meta: {
      sellerLayout: true,
      privateRoute: true,
    },
  },
  {
    id: "dashboard",
    path: "/seller/profile",
    component: SellerProfilePage,
    meta: {
      privateRoute: true,
    },
  },
];

export default SellerRoutes;
