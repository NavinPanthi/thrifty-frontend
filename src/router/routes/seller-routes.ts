import { lazy } from "react";

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
];

export default SellerRoutes;
