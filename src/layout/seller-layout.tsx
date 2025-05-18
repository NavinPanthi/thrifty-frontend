import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import SellerSidebar from "@/features/seller/sidebar";

import { RootState } from "@/redux/store";

function SellerLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  const loginStatus = useSelector<RootState>((state) => state.user.loginStatus);

  if (!loginStatus) {
    return <Navigate to="/login" />;
  }

  if (loginStatus && pathname === "/") {
    return <Navigate replace={true} to="/" />;
  }

  return (
    <div className="relative flex h-[100vh] bg-neutral-100">
      <SellerSidebar className="sticky top-0 h-full w-[260px] flex-none bg-core-primary px-2 py-6 tracking-wider text-shade-light shadow-md" />

      <main className="w-full overflow-auto rounded-lg p-6 xl:p-20">
        {children}
      </main>
    </div>
  );
}

export default SellerLayout;
