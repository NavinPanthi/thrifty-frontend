import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "@/features/admin/sidebar";

import { IUserState } from "@/redux/slices/user-slice";
import { RootState } from "@/redux/store";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  const { loginStatus } = useSelector<RootState, IUserState>(
    (state) => state.user
  );

  if (!loginStatus) {
    return <Navigate to="/log-in" />;
  }

  if ((loginStatus && pathname === "/") || pathname === "/admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="relative flex h-[100vh] bg-neutral-100">
      <Sidebar className="sticky top-0 h-full w-[260px] flex-none bg-shade-light shadow-md" />

      <main className="w-full overflow-auto rounded-lg p-6 xl:p-12">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
