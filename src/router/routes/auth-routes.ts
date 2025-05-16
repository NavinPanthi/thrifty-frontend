import { lazy } from "react";

import SignUp from "@/pages/auth/sign-up";
import Landing from "@/pages/landing/landing";

const Login = lazy(() => import("@/pages/auth/login"));
const AuthHome = lazy(() => import("@/pages/auth/auth-home"));

interface IAuthRoutes {
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

const authRoutes: IAuthRoutes[] = [
  {
    id: "auth",
    path: "/",
    component: Landing,
    meta: {
      privateRoute: false,
    },
  },

  {
    id: "login",
    path: "/log-in",
    component: Login,
    meta: {
      privateRoute: false,
    },
  },
  {
    id: "signup",
    path: "/sign-up",
    component: SignUp,
    meta: {
      privateRoute: false,
    },
  },
];

export default authRoutes;
