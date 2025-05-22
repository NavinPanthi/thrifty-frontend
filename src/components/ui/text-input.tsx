import { forwardRef, useState } from "react";

import { ViewIcon, ViewOffIcon } from "hugeicons-react";

import cn from "../../lib/classnames";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  containerClassName?: string;
  errorMsg?: string;
  isPasswordInput?: boolean;
  showErrorMsg?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    inputClassName,
    containerClassName,
    errorMsg,
    disabled,
    type,
    placeholder,
    isPasswordInput = false,
    showErrorMsg = true,
    ...rest
  } = props;

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className={cn({ relative: isPasswordInput }, containerClassName)}>
      <input
        className={cn("input", inputClassName, {
          "border-supporting-error text-supporting-error focus:border-supporting-error":
            errorMsg,
        })}
        type={!isPasswordShown && isPasswordInput ? "password" : type}
        placeholder={placeholder}
        disabled={disabled}
        ref={ref}
        {...rest}
      />

      {isPasswordInput && (
        <div
          className={cn(
            "absolute right-0 top-1/2 w-8 -translate-y-1/2 cursor-pointer",
            { "top-1/3": isPasswordInput && errorMsg }
          )}
        >
          {isPasswordShown ? (
            <ViewOffIcon width={22} onClick={() => setIsPasswordShown(false)} />
          ) : (
            <ViewIcon width={22} onClick={() => setIsPasswordShown(true)} />
          )}
        </div>
      )}
      {errorMsg && showErrorMsg && (
        <p className="mt-2 text-sm text-red-500">{errorMsg}</p>
      )}
    </div>
  );
});

export default TextInput;
