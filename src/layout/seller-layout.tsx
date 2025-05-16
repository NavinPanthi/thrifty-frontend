import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "@/features/seller/sidebar";

import { RootState } from "@/redux/store";

function SellerLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  const loginStatus = useSelector<RootState>((state) => state.user.loginStatus);

  if (!loginStatus) {
    return <Navigate to="/login/super-admin" />;
  }

  if (loginStatus && pathname === "/") {
    return <Navigate replace={true} to="/super-admin" />;
  }

  return (
    <div className="flex bg-neutral-100">
      <Sidebar className="sticky top-0 w-[260px] flex-none bg-shade-light shadow-md" />
      <main className="h-fit w-full overflow-auto rounded-lg p-6 xl:p-12">
        {children}
      </main>
    </div>
  );
}

export default SellerLayout;
