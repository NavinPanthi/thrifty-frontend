import { forwardRef } from "react";

import cn from "@/lib/classnames";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputClassName?: string;
  errorMsg?: string;
  isPasswordInput?: boolean;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      inputClassName,
      errorMsg,
      disabled,
      placeholder,
      id,
      rows = 3,
      cols = 30,
      ...rest
    } = props;

    return (
      <div>
        <textarea
          id={id}
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          className={cn("input", inputClassName)}
          rows={rows}
          cols={cols}
          {...rest}
        />

        {errorMsg && <p className="mt-2 text-sm text-red-500">{errorMsg}</p>}
      </div>
    );
  }
);

export default TextAreaInput;
