import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminLayout from "@/layout/admin-layout";
import SellerLayout from "@/layout/seller-layout";

import { RootState } from "@/redux/store";
import { getUserData } from "@/utils/auth-storage";
import { checkAdmin } from "@/utils/check-admin";
import { checkSeller } from "@/utils/check-seller";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const loginStatus = useSelector<RootState>((state) => state.user.loginStatus);

  const userData = getUserData();
  const isSeller = checkSeller(userData);
  const isAdmin = checkAdmin(userData);

  if (!loginStatus) {
    return <Fragment>{children}</Fragment>;
  }

  if (isSeller) {
    return <SellerLayout>{children}</SellerLayout>;
  }
  if (isAdmin && !isSeller) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <Fragment>{children}</Fragment>;
}

export default LayoutWrapper;
