import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import PageNotFound from "@/pages/404";
import ErrorBoundary from "@/components/error-boundary";

import { RootState } from "@/redux/store";
import { getUserData } from "@/utils/auth-storage";
import { checkAdmin } from "@/utils/check-admin";
import { checkSeller } from "@/utils/check-seller";

import LayoutWrapper from "./layout-wrapper";
import adminRoutes from "./routes/admin-routes";
import authRoutes from "./routes/auth-routes";
import SellerRoutes from "./routes/seller-routes";
import userRoutes from "./routes/user-routes";

const MergedLayoutRoute = ({ children }: { children?: React.ReactNode }) => {
  return (
    <LayoutWrapper>
      <Suspense
        fallback={
          <div className="flex h-[calc(100vh-96px)] w-full items-center justify-center p-0">
            <img height={200} width={200} src="/public/logo.png" alt="logo" />
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

  return checkAdmin(getUserData())
    ? adminRoutes
    : checkSeller(getUserData())
      ? SellerRoutes
      : userRoutes;
};

function Router() {
  const loginStatus = useSelector<RootState>((state) => state.user.loginStatus);
  const routes = getRoutes(loginStatus as boolean);

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
