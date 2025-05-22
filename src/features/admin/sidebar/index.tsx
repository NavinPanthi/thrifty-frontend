import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import {
  Logout01Icon,
  ResetPasswordIcon,
  UserAccountIcon,
} from "hugeicons-react";
import toast from "react-hot-toast";

import Button from "@/components/ui/button";
import Popup from "@/components/ui/popup";
import { adminLinks, INavigation } from "@/navigation/admin/admin-navigation";

import { resetLogin } from "@/redux/slices/user-slice";
import { getUserData } from "@/utils/auth-storage";
import { getInitialsTitle } from "@/utils/get-initials-title";
import cn from "@/lib/classnames";

const AdminSidebar = ({ className }: { className: string }) => {
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
        to="/admin/products"
      >
        Thrifty
      </Link>

      <div className="mt-4 flex flex-col gap-2">
        {adminLinks.map((label: INavigation) => {
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

      <div className="mt-auto w-full">
        <Popup
          className="!right-2 !mt-[-240px] border !border-shade-light !bg-core-primary text-shade-light shadow-2xl"
          buttonClassName="w-full"
          button={
            <div
              className={cn(
                "mt-4 flex items-center gap-2 rounded-lg px-[10px] py-[9px] shadow transition-colors hover:rounded-lg"
              )}
            >
              <div className="flex size-10 items-center justify-center rounded-full border border-shade-light shadow-lg">
                {userData && getInitialsTitle(userData?.fullName)}
              </div>
              <span>{userData?.fullName}</span>
            </div>
          }
        >
          <div>
            <Link
              to="/admin/profile"
              className={cn(
                "mt-4 flex items-center gap-2 rounded-lg px-[10px] py-[9px] shadow transition-colors hover:rounded-lg",
                {
                  "bg-shade-light text-core-primary":
                    pathname.includes("/admin/profile".split("?")[0]) ||
                    pathname.includes("/admin/profile"),
                  "text-shade-light/70 hover:bg-neutral-50 hover:text-core-primary hover:ease-linear":
                    !pathname.includes("/admin/profile".split("?")[0]) ||
                    !pathname.includes("/admin/profile"),
                }
              )}
            >
              <UserAccountIcon /> <p>Profile</p>
            </Link>
            <Link
              to="/admin/change-password"
              className={cn(
                "mt-2 flex items-center gap-2 rounded-lg px-[10px] py-[9px] shadow transition-colors hover:rounded-lg",
                {
                  "bg-shade-light text-core-primary":
                    pathname.includes("/admin/change-password".split("?")[0]) ||
                    pathname.includes("/admin/change-password"),
                  "text-shade-light/70 hover:bg-neutral-50 hover:text-core-primary hover:ease-linear":
                    !pathname.includes(
                      "/admin/change-password".split("?")[0]
                    ) || !pathname.includes("/admin/change-password"),
                }
              )}
            >
              <ResetPasswordIcon />
              <p>Change Password</p>
            </Link>
            <Button
              className="my-2 flex w-full justify-start px-[10px] py-[9px] text-shade-light/70 shadow transition-colors hover:rounded-lg hover:bg-neutral-50 hover:text-core-primary hover:ease-linear"
              LeftIcon={Logout01Icon}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default AdminSidebar;
