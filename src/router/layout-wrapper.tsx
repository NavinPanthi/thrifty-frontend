import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminLayout from "@/layout/admin-layout";
import SuperAdminLayout from "@/layout/seller-layout";

import { RootState } from "@/redux/store";
import { getUserData } from "@/utils/auth-storage";

const userInvitationPathname = "/admin/invitation/";

const checkSuperAdmin = () => {
  const userData = getUserData();
  return userData?.isSuperAdmin || false;
};

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const loginStatus = useSelector<RootState>((state) => state.user.loginStatus);
  const { pathname } = useLocation();
  const isSuperAdmin = checkSuperAdmin();

  if (!loginStatus) {
    return <Fragment>{children}</Fragment>;
  }

  if (isSuperAdmin && pathname !== userInvitationPathname) {
    return <SuperAdminLayout>{children}</SuperAdminLayout>;
  }

  if (!isSuperAdmin && pathname !== userInvitationPathname) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <Fragment>{children}</Fragment>;
}

export default LayoutWrapper;
