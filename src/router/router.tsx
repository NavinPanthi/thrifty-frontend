import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import PageNotFound from "@/pages/404";
import Landing from "@/pages/landing/landing";
import ErrorBoundary from "@/components/error-boundary";

import { RootState } from "@/redux/store";
import { getUserData } from "@/utils/auth-storage";

import LayoutWrapper from "./layout-wrapper";
import adminRoutes from "./routes/admin-routes";
import authRoutes from "./routes/auth-routes";
import SellerRoutes from "./routes/seller-routes";
import userRoutes from "./routes/user-routes";

// Utility function to check if the user is a super admin
const checkAdmin = () => {
  const userData = getUserData();
  return userData?.isSuperAdmin || false;
};
const checkSeller = () => {
  const userData = getUserData();
  return userData?.isSuperAdmin || false;
};

// Merged layout route that wraps around the page components with fallback UI
const MergedLayoutRoute = ({ children }: { children?: React.ReactNode }) => {
  return (
    <LayoutWrapper>
      <Suspense
        fallback={
          <div className="flex h-[calc(100vh-96px)] w-full items-center justify-center p-0">
            <img height={100} width={100} src="/public/logo.webp" alt="logo" />
          </div>
        }
      >
        <ReactErrorBoundary fallback={<ErrorBoundary />}>
          {children}
        </ReactErrorBoundary>
      </Suspense>
    </LayoutWrapper>
  );
};

const getRoutes = (loginStatus: boolean) => {
  if (!loginStatus) {
    return authRoutes;
  }

  // return checkAdmin() ? adminRoutes : checkSeller() ? SellerRoutes : userRoutes;
};

function Router() {
  // const loginStatus = useSelector<RootState>((state) => state.user.loginStatus);
  // const routes = getRoutes(loginStatus as boolean);
  const routes = getRoutes(false);

  return (
    <BrowserRouter>
      <Routes>
        {routes?.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={
              <MergedLayoutRoute>{<route.component />}</MergedLayoutRoute>
            }
          />
        ))}

        <Route
          path="*"
          element={
            <MergedLayoutRoute>
              <PageNotFound />
            </MergedLayoutRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
