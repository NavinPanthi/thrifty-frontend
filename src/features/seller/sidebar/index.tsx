import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { Logout01Icon } from "hugeicons-react";
import toast from "react-hot-toast";

import Button from "@/components/ui/button";
import {
  INavigation,
  sellerLinks,
} from "@/navigation/seller/seller-navigation";

import { resetLogin } from "@/redux/slices/user-slice";
import { getUserData } from "@/utils/auth-storage";
import { getInitialsTitle } from "@/utils/get-initials-title";
import cn from "@/lib/classnames";

const SellerSidebar = ({ className }: { className: string }) => {
  const { pathname } = useLocation();
  const userData = getUserData();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    queryClient.removeQueries();
    dispatch(resetLogin());
    toast.success("user logout successfully");
    navigate("/");
  };
  return (
    <div className={cn(className, "flex flex-col")}>
      <Link
        className="leading border border-shade-light px-10 py-3 text-3xl uppercase"
        to="/seller/dashboard"
      >
        Thrifty
      </Link>

      <div className="mt-4 flex flex-col gap-2">
        {sellerLinks.map((label: INavigation) => {
          const isActive =
            pathname.includes(label.path.split("?")[0]) ||
            pathname.includes(label.path);

          return (
            <Link
              key={label.name}
              to={label.path}
              className={cn(
                "flex items-center gap-2 rounded-lg px-[10px] py-[9px] shadow transition-colors hover:rounded-lg",
                {
                  "bg-shade-light text-core-primary": isActive,
                  "text-shade-light/70 hover:bg-neutral-50 hover:text-core-primary hover:ease-linear":
                    !isActive,
                }
              )}
            >
              <label.icon />
              <span>{label.name}</span>
            </Link>
          );
        })}
      </div>
      <Link
        to="/seller/profile"
        className={cn(
          "mt-4 flex items-center gap-2 rounded-lg px-[10px] py-[9px] shadow transition-colors hover:rounded-lg",
          {
            "bg-shade-light text-core-primary":
              pathname.includes("/seller/profile".split("?")[0]) ||
              pathname.includes("/seller/profile"),
            "text-shade-light/70 hover:bg-neutral-50 hover:text-core-primary hover:ease-linear":
              !pathname.includes("/seller/profile".split("?")[0]) ||
              !pathname.includes("/seller/profile"),
          }
        )}
      >
        <div className="flex size-10 items-center justify-center rounded-full border border-shade-light shadow-lg">
          {getInitialsTitle(userData?.fullName)}
        </div>
        <span>Profile</span>
      </Link>
      <Button
        className="mt-auto"
        LeftIcon={Logout01Icon}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </div>
  );
};

export default SellerSidebar;
