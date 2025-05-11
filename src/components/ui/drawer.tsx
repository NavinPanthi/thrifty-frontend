import ModernDrawer from "react-modern-drawer";

import cn from "@/lib/classnames";

export interface IDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  children?: React.ReactNode;
  className?: string;
  size?: number;
}

const Drawer = (props: IDrawerProps) => {
  const { children, isOpen, toggleDrawer, className = "", size = 500 } = props;

  return (
    <ModernDrawer
      open={isOpen}
      onClose={toggleDrawer}
      size={size}
      direction="right"
      className={cn(className, "drawer-scrollbar overflow-y-scroll p-6")}
    >
      {children}
    </ModernDrawer>
  );
};

export default Drawer;
