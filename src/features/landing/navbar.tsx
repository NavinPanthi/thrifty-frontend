import { useNavigate } from "react-router-dom";

import { ShoppingCart01Icon, UserIcon } from "hugeicons-react";

const Navbar = () => {
  // const navigate = useNavigate();
  const handleShopClick = () => {
    console.log("Shop clicked");
  };

  const handleAboutClick = () => {
    console.log("About clicked");
  };

  const handleContactClick = () => {
    console.log("Contact Us clicked");
  };

  const handleUserClick = () => {
    window.location.href = "/log-in";

    // navigate("/login");
    //further need
  };

  const handleCartClick = () => {
    console.log("Cart icon clicked");
  };

  const renderTabs = () => {
    const tabs = [
      { id: 1, title: "shop", onClick: handleShopClick },
      { id: 2, title: "about", onClick: handleAboutClick },
      { id: 3, title: "contact us", onClick: handleContactClick },
      { id: 4, icon: <UserIcon />, onClick: handleUserClick },
      { id: 5, icon: <ShoppingCart01Icon />, onClick: handleCartClick },
    ];

    return tabs.map((tab) => (
      <li key={tab.id} className="nav-item">
        <a className="hover:cursor-pointer" onClick={tab.onClick}>
          {tab.title ? tab.title : tab.icon}
        </a>
      </li>
    ));
  };

  return (
    <nav className="sticky top-0 z-50 flex h-28 items-center justify-between border-b bg-white px-4 tracking-widest lg:px-28">
      <a
        className="leading border border-black px-10 py-3 text-3xl uppercase"
        href="/"
      >
        Thrifty
      </a>
      <ul className="flex items-center gap-10 uppercase">{renderTabs()}</ul>
    </nav>
  );
};

export default Navbar;
