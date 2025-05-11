type BadgeType = {
  size?: "lg" | "md" | "sm";
  variant?:
    | "primary"
    | "primary-info"
    | "primary-outline"
    | "primary-info-outline"
    | "danger"
    | "danger-outline"
    | "success"
    | "success-outline"
    | "warning"
    | "warning-outline"
    | "dark"
    | "dark-outline";
  title: string;
  className?: string;
};

function Badge(props: BadgeType) {
  const { size = "md", title, className, variant = "primary" } = props;

  const variantClassName = {
    primary: "bg-core-primary text-supporting-info-light",
    "primary-outline": "bg-supporting-info-light text-core-primary",
    "primary-info": "bg-supporting-info text-supporting-info-light",
    "primary-info-outline": "bg-supporting-info-light text-supporting-info",
    danger: "bg-supporting-error text-supporting-warning-light",
    "danger-outline": "bg-supporting-error-light text-supporting-error",
    success: "bg-supporting-success text-supporting-success-light",
    "success-outline": "bg-supporting-success-light text-supporting-success",
    warning: "bg-supporting-warning text-neutral-800",
    "warning-outline": "text-supporting-warning bg-supporting-warning-light",
    dark: "bg-neutral-800 text-neutral-50",
    "dark-outline": "bg-neutral-100 text-neutral-800",
  }[variant];

  const sizeClassName = {
    lg: "px-3 py-[5px] text-sm",
    md: "px-[10px] py-[3px] text-sm",
    sm: "px-2 py-[1px] text-xs",
  }[size];

  const badgeClassName = `inline-block h-fit rounded-full font-medium w-fit whitespace-nowrap ${sizeClassName} ${variantClassName} ${className}`;

  return <span className={badgeClassName}>{title}</span>;
}

export default Badge;
