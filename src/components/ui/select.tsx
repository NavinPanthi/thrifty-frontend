import { forwardRef } from "react";

import cn from "@/lib/classnames";

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  inputClassName?: string;
  title?: string;
  options?: { id?: string | number; value: string; name?: string }[];
  errorMsg?: string;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (props, ref) => {
    const { inputClassName, title, options, errorMsg, id, ...rest } = props;

    return (
      <>
        <select
          ref={ref}
          id={id}
          className={cn("input", inputClassName)}
          {...rest}
        >
          {title && (
            <option value="" className="hidden">
              {title}
            </option>
          )}

          {options?.map((item, index) => (
            <option key={item?.id ?? index} value={item.value}>
              {item.name ?? item.value}
            </option>
          ))}
        </select>

        {errorMsg && <p className="mt-2 text-sm text-red-500">{errorMsg}</p>}
      </>
    );
  }
);

export default SelectInput;
