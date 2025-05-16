import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useErrorBoundary } from "react-error-boundary";

import { IUserState } from "@/redux/slices/user-slice";
import { RootState } from "@/redux/store";

function ErrorBoundary() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const prevPathnameRef = useRef(pathname);

  const { resetBoundary } = useErrorBoundary();

  const { user } = useSelector<RootState, IUserState>((state) => state.user);

  const handleNavigate = () => {
    navigate(user?.isSuperAdmin ? "/super-admin/users" : "/admin/dashboard", {
      replace: true,
    });
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
