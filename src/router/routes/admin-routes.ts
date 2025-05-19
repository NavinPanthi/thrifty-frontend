import { lazy } from "react";

import AdminProductsPage from "@/pages/admin/products/admin-products-page";
import ProductDetailAdminPage from "@/pages/admin/products/product-detail-page";
import UsersPage from "@/pages/admin/users/users-page";

const Dashboard = lazy(() => import("@/pages/admin/dashboard"));

interface IAdminRoutes {
  id: string;
  path: string;
  component: React.FC;
  meta?: {
    adminLayout?: boolean;
    privateRoute?: boolean;
  };
}
const adminRoutes: IAdminRoutes[] = [
  {
    id: "admin-dashboard",
    path: `admin/dashboard`,
    component: Dashboard,
    meta: {
      adminLayout: true,
      privateRoute: true,
    },
  },
  {
    id: "admin-dashboard",
    path: `admin/products`,
    component: AdminProductsPage,
    meta: {
      adminLayout: true,
      privateRoute: true,
    },
  },

  {
    id: "product-page",
    path: "/product/:id",
    component: ProductDetailAdminPage,
    meta: {
      adminLayout: true,
      privateRoute: false,
    },
  },
  {
    id: "users-page",
    path: "/admin/users",
    component: UsersPage,
    meta: {
      adminLayout: true,
      privateRoute: true,
    },
  },
  {
    id: "users-page",
    path: "/admin/change-password",
    component: UsersPage,
    meta: {
      adminLayout: true,
      privateRoute: true,
    },
  },
];

export default adminRoutes;
