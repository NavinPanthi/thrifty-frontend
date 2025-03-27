import { UserIcon } from "hugeicons-react";

const Navbar = () => {
  const renderTabs = () => {
    const tabs = [
      { id: 1, title: "shop" },
      { id: 2, title: "about" },
      { id: 3, title: "contact us" },
      { id: 4, icon: <UserIcon /> },
    ];
    return tabs.map((tab) => (
      <li key={tab.id} className="nav-item">
        {tab.title ? tab.title : tab.icon}
      </li>
    ));
  };

  return (
    <nav className="mx-32 flex h-32 items-center justify-between tracking-widest">
      <div className="leading border border-black px-10 py-3 text-3xl uppercase">
        Thrifty
      </div>
      <ul className="flex items-center gap-10 uppercase">{renderTabs()}</ul>
    </nav>
  );
};
export default Navbar;
