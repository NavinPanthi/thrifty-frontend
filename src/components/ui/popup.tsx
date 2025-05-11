import { Fragment } from "react";

import { Popover, Transition } from "@headlessui/react";
import cn from "classnames";

export default function Popup({
  className,
  children,
  button,
  buttonClassName,
}: {
  className?: string;
  button: React.ReactNode;
  children: React.ReactNode;
  buttonClassName?: string;
}) {
  return (
    <Popover className="relative">
      <Popover.Button className={cn("border-0", buttonClassName)}>
        {button}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className={cn(
            className,
            "absolute right-0 z-10 mt-3 transform rounded-2xl bg-shade-light p-1 px-4 lg:max-w-3xl"
          )}
        >
          {children}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
