import { forwardRef, HTMLAttributes } from "react";

import cn from "classnames";

interface ToggleProps extends HTMLAttributes<HTMLInputElement> {
  className?: string;
  defaultChecked?: boolean;
  isPending?: boolean;
  onClickStopPropagation?: (e: React.MouseEvent) => void;
}

const ToggleInput = forwardRef<HTMLInputElement, ToggleProps>(
  (
    { defaultChecked, isPending, className, onClickStopPropagation, ...rest },
    ref
  ) => {
    return (
      <label
        onClick={onClickStopPropagation}
        className={cn(
          "relative inline-flex cursor-pointer items-center",
          className
        )}
      >
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          disabled={isPending}
          {...rest}
          ref={ref}
          value=""
          className="peer sr-only"
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-core-primary peer-checked:after:translate-x-full peer-focus:outline-none rtl:peer-checked:after:-translate-x-full"></div>
      </label>
    );
  }
);

export default ToggleInput;
