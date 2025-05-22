import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ClipboardIcon,
  Logout01Icon,
  Profile02Icon,
  ResetPasswordIcon,
  ShoppingCart01Icon,
  UserIcon,
} from "hugeicons-react";

import LogoutModal from "@/components/auth/logout-modal";
import Button from "@/components/ui/button";
import Popup from "@/components/ui/popup";

import { getUserData } from "@/utils/auth-storage";
import { checkUser } from "@/utils/check-user";
import { getInitialsTitle } from "@/utils/get-initials-title";

import useGetCartItemsQuery from "@/services/user/cart/use-get-cart-items";

const Navbar = () => {
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const userData = getUserData();
  const isUser = checkUser(userData);

  const handleShopClick = () => {
    navigate("/shop");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleUserClick = () => {
    if (!isUser) {
      navigate("/log-in");
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const renderTabs = () => {
    const tabs = [
      { id: 1, title: "shop", onClick: handleShopClick },
      { id: 2, title: "about", onClick: handleAboutClick },
      { id: 3, title: "contact us", onClick: handleContactClick },
      {
        id: 4,
        icon: GetProfileIcon(),
        onClick: handleUserClick,
      },
      { id: 5, icon: GetCartIcon(), onClick: handleCartClick },
    ];

    return tabs.map((tab) => (
      <li key={tab.id} className="nav-item">
        <a className="hover:cursor-pointer" onClick={tab.onClick}>
          {tab.title ? tab.title : tab.icon}
        </a>
      </li>
    ));
  };
  const GetProfileIcon = () => {
    const userData = getUserData();
    const isUser = checkUser(userData);
    return isUser ? (
      <>
        <Popup
          button={
            <p className="rounded-full border border-shade-light p-2">
              {getInitialsTitle(userData?.fullName)}
            </p>
          }
          className="py-2"
        >
          <div className="flex min-w-fit flex-col gap-1 rounded-lg">
            <Button
              rounded="sm"
              type="button"
              variant="tertiary"
              LeftIcon={ClipboardIcon}
              size="sm"
              className="justify-start text-nowrap"
              onClick={() => navigate("/orders")}
            >
              My orders
            </Button>
            <Button
              rounded="sm"
              type="button"
              variant="tertiary"
              LeftIcon={Profile02Icon}
              size="sm"
              className="justify-start"
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Button
              rounded="sm"
              type="button"
              variant="tertiary"
              size="sm"
              LeftIcon={ResetPasswordIcon}
              className="justify-start text-nowrap"
              onClick={() => navigate("/change-password")}
            >
              Change password
            </Button>
            <Button
              rounded="sm"
              type="button"
              variant="danger"
              size="sm"
              className="justify-start text-nowrap"
              LeftIcon={Logout01Icon}
              onClick={() => {
                setIsModal(true);
              }}
            >
              Log out
            </Button>
          </div>
        </Popup>
      </>
    ) : (
      <UserIcon />
    );
  };
  const GetCartIcon = () => {
    const userData = getUserData();
    const isUser = checkUser(userData);

    const { data: cartItems } = useGetCartItemsQuery();

    if (!isUser) return <ShoppingCart01Icon />;

    const itemCount = cartItems?.length || 0;
    console.log(itemCount);

    return (
      <div className="relative">
        <ShoppingCart01Icon size="2em" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 rounded-full bg-shade-light px-1 py-0.5 text-xs leading-none text-shade-dark">
            {itemCount}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <nav className="sticky top-0 z-50 flex h-28 items-center justify-between bg-core-primary px-4 tracking-widest text-shade-light lg:px-28">
        <a
          className="leading border border-shade-light px-10 py-3 text-3xl uppercase"
          href="/"
        >
          Thrifty
        </a>
        <ul className="flex items-center gap-10 uppercase">{renderTabs()}</ul>
      </nav>
      <LogoutModal isOpen={isModal} closeModal={() => setIsModal(!isModal)} />
    </>
  );
};

export default Navbar;
