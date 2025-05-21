import { lazy } from "react";

import AboutPage from "@/pages/landing/about";
import ContactPage from "@/pages/landing/contact";
import ShopPage from "@/pages/landing/shop";
import CartPage from "@/pages/user/cart";
import OrderPage from "@/pages/user/order/order";
import PaymentPage from "@/pages/user/payment-page";
import ProductDetailUserPage from "@/pages/user/product-detail-page";

const Landing = lazy(() => import("@/pages/landing/landing"));
interface IUserRoutes {
  id: string;
  path: string;
  component: React.FC;
  meta: {
    SellerLayout?: boolean;
    adminLayout?: boolean;
    userLayout?: boolean;
    privateRoute: boolean;
  };
}

const userRoutes: IUserRoutes[] = [
  {
    id: "landing",
    path: "/",
    component: Landing,
    meta: {
      privateRoute: false,
    },
  },

  {
    id: "about",
    path: "/about",
    component: AboutPage,
    meta: {
      userLayout: true,
      privateRoute: false,
    },
  },
  {
    id: "contact-us",
    path: "/contact",
    component: ContactPage,
    meta: {
      userLayout: true,
      privateRoute: false,
    },
  },
  {
    id: "shop",
    path: "/shop",
    component: ShopPage,
    meta: {
      userLayout: true,
      privateRoute: false,
    },
  },
  {
    id: "cart",
    path: "/cart",
    component: CartPage,
    meta: {
      userLayout: true,
      privateRoute: true,
    },
  },

  {
    id: "product-page",
    path: "/product/:id",
    component: ProductDetailUserPage,
    meta: {
      userLayout: true,
      privateRoute: false,
    },
  },
  {
    id: "order-page",
    path: "/orders",
    component: OrderPage,
    meta: {
      userLayout: true,
      privateRoute: true,
    },
  },
  {
    id: "payment",
    path: "/payment",
    component: PaymentPage,
    meta: {
      userLayout: true,
      privateRoute: true,
    },
  },
];

export default userRoutes;
