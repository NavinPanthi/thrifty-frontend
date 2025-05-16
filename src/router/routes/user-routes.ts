import { lazy } from "react";

import AboutPage from "@/pages/landing/about";
import ContactPage from "@/pages/landing/contact";
import ShopPage from "@/pages/landing/shop";
import Cart from "@/pages/user/cart";

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
    component: Cart,
    meta: {
      userLayout: true,
      privateRoute: true,
    },
  },
];

export default userRoutes;
