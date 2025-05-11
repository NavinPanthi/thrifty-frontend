import { HugeiconsProps } from "hugeicons-react";
import { BeatLoader } from "react-spinners";

import cn from "@/lib/classnames";

export const VariantClassName = {
  primary:
    "bg-core-primary text-shade-light disabled:cursor-not-allowed disabled:bg-core-primary/60 focus:outline-none focus:ring focus:ring-core-primary/30 ",
  secondary:
    "bg-neutral-50 text-core-primary border-2 border-core-primary disabled:cursor-not-allowed disabled:bg-neutral-60/50 focus:outline-none focus:ring focus:ring-neutral-50/30",
  danger:
    "bg-supporting-error text-white disabled:cursor-not-allowed disabled:bg-supporting-error/60 focus:outline-none focus:ring focus:ring-supporting-error/30",
  tertiary:
    "bg-neutral-50 text-neutral-800 border-2 border-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-50/60 focus:outline-none focus:ring focus:ring-neutral-200/30",
  "primary-outline":
    "bg-white border-2 border-core-primary text-core-primary disabled:cursor-not-allowed disabled:bg-neutral-60/50 focus:outline-none focus:ring focus:ring-core-primary/30",
  "danger-outline":
    "bg-white border-2 border-supporting-error text-supporting-error disabled:cursor-not-allowed disabled:border-supporting-error/50 disabled:text-supporting-error/50 focus:outline-none focus:ring focus:ring-supporting-error/30",
} as const;

// eslint-disable-next-line react-refresh/only-export-components
export const sizeClassName = {
  sm: "px-3 py-[6px] title-group",
  md: "px-5 py-[10px] body-large-semibold",
  lg: "px-6 py-3 title-body",
} as const;

const roundedClassName = {
  none: "rounded-none",
  sm: "rounded-[10px]",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
} as const;

interface ButtonProps extends React.ComponentProps<"button"> {
  onClick?: (e: React.MouseEvent) => void;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "tertiary"
    | "primary-outline"
    | "danger-outline";
  size?: "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
  className?: string;
  LeftIcon?: React.FC<HugeiconsProps>;
  RightIcon?: React.FC<HugeiconsProps>;
  iconSize?: number;
  children: React.ReactNode;
}

function Button(props: ButtonProps) {
  const {
    onClick,
    variant = "primary",
    size = "md",
    rounded = "md",
    children,
    isLoading,
    className,
    LeftIcon,
    RightIcon,
    iconSize = 16,
    disabled,
    ...rest
  } = props;

  const computedClassName = cn(
    ` ${VariantClassName[variant]} ${sizeClassName[size]} ${roundedClassName[rounded]}  ${(LeftIcon || RightIcon) && "flex gap-2 items-center justify-center"}`,
    className
  );

  const loaderColor = {
    primary: "white",
    secondary: "#1890FF",
    danger: "white",
    "danger-outline": "#D12E24",
    "primary-outline": "#1890FF",
    tertiary: "#1E293B",
  }[variant];

  return (
    <button
      disabled={isLoading || disabled}
      className={computedClassName}
      onClick={onClick}
      {...rest}
    >
      {LeftIcon && <LeftIcon size={iconSize} />}
      <span className="flex items-center justify-center gap-1">
        {children} {isLoading && <BeatLoader size={4} color={loaderColor} />}
      </span>
      {RightIcon && (
        <RightIcon className="shrink-0" height={iconSize} width={iconSize} />
      )}
    </button>
  );
}

export default Button;
