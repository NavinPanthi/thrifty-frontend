import { lazy } from "react";

import SellerOrdersPage from "@/pages/seller/orders/seller-orders-page";
import ProductDetailSellerPage from "@/pages/seller/products/product-detail-page";
import SellerProductsPage from "@/pages/seller/products/seller-products-page";
import SellerProfilePage from "@/pages/seller/profile";
import SellerChangePassword from "@/pages/seller/profile/seller-change-password";

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
    id: "seller-products",
    path: "/seller/products",
    component: SellerProductsPage,
    meta: {
      sellerLayout: true,
      privateRoute: true,
    },
  },
  {
    id: "seller-orders",
    path: "/seller/orders",
    component: SellerOrdersPage,
    meta: {
      sellerLayout: true,
      privateRoute: true,
    },
  },
  {
    id: "seller-profile",
    path: "/seller/profile",
    component: SellerProfilePage,
    meta: {
      privateRoute: true,
      sellerLayout: true,
    },
  },
  {
    id: "product-detail",
    path: "/product/:id",
    component: ProductDetailSellerPage,
    meta: {
      privateRoute: true,
    },
  },
  {
    id: "change-password",
    path: "/seller/change-password",
    component: SellerChangePassword,
    meta: {
      privateRoute: true,
    },
  },
];

export default SellerRoutes;
