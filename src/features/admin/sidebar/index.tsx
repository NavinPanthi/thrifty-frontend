import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { Logout01Icon } from "hugeicons-react";
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
        to="/admin/dashboard"
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
      {/* <Link
        to="/admin/profile"
        className={cn(
          "mt-auto flex items-center gap-2 rounded-lg px-[10px] py-[9px] shadow transition-colors hover:rounded-lg",
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
        <div className="flex size-10 items-center justify-center rounded-full border border-shade-light shadow-lg">
          {getInitialsTitle(userData?.fullName)}
        </div>
        <span>{userData?.fullName}</span>
      </Link> */}
      {/* <Button
        className="mt-auto"
        LeftIcon={Logout01Icon}
        onClick={handleLogout}
      >

        Log out
      </Button> */}
      <Popup
        button={
          <p className="rounded-full border border-shade-light p-2">
            {getInitialsTitle(userData?.fullName)}
          </p>
        }
        className="py-2"
      >
        <div className="flex flex-col gap-2 rounded-lg">
          <Button
            rounded="sm"
            type="button"
            variant="tertiary"
            // LeftIcon={Profile02Icon}
          >
            Profile
          </Button>
          <Button
            rounded="sm"
            type="button"
            className="text-nowrap"
            variant="danger"
            LeftIcon={Logout01Icon}
            // onClick={() => {
            //   setIsModal(true);
            // }}
          >
            Log out
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default AdminSidebar;
