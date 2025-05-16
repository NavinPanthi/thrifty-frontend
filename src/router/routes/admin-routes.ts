import { lazy } from "react";

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
];

export default adminRoutes;
