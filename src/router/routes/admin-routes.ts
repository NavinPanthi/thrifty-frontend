import AdminChatPage from "@/pages/admin/admin-chat-page";
import AdminProductsPage from "@/pages/admin/products/admin-products-page";
import ProductDetailAdminPage from "@/pages/admin/products/product-detail-page";
import UsersPage from "@/pages/admin/users/users-page";
import SellerProfilePage from "@/pages/seller/profile";
import SellerChangePassword from "@/pages/seller/profile/seller-change-password";

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
    id: "admin-products",
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
    component: SellerChangePassword,
    meta: {
      adminLayout: true,
      privateRoute: true,
    },
  },
  {
    id: "users-page",
    path: "/admin/profile",
    component: SellerProfilePage,
    meta: {
      adminLayout: true,
      privateRoute: true,
    },
  },
  {
    id: "users-page",
    path: "/admin/chat",
    component: AdminChatPage,
    meta: {
      adminLayout: true,
      privateRoute: true,
    },
  },
];

export default adminRoutes;
