import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useErrorBoundary } from "react-error-boundary";

import { IUserState } from "@/redux/slices/user-slice";
import { RootState } from "@/redux/store";
import { getUserData } from "@/utils/auth-storage";
import { checkAdmin } from "@/utils/check-admin";
import { checkSeller } from "@/utils/check-seller";

function ErrorBoundary() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const prevPathnameRef = useRef(pathname);

  const { resetBoundary } = useErrorBoundary();

  const handleNavigate = () => {
    const userData = getUserData();
    navigate(
      checkAdmin(userData)
        ? "/admin/dashboard"
        : checkSeller(userData)
          ? "/seller/dashboard"
          : "/",
      {
        replace: true,
      }
    );
  };

  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      resetBoundary();
    }
  }, [pathname, resetBoundary]);

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-neutral-900">
        Oops! Something went wrong.
      </h1>
      <p className="mt-4 text-2xl font-semibold text-neutral-600">
        An unexpected error occurred. Please try again or return home.
      </p>

      <button
        onClick={handleNavigate}
        className="primary-btn-lg mt-4 rounded-full text-shade-light"
      >
        Go Home
      </button>
    </div>
  );
}

export default ErrorBoundary;
