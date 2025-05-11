import cn from "@/lib/classnames";

const sizeClassName = {
  xxxSmall: "size-6 text-[10px] font-semibold",
  xxSmall: "size-8 body-small-medium",
  xSmall: "size-11 body-large-semibold ",
  small: "size-[64px] title-sub-section text-lg",
  large: "size-[80px]  title-screen text-2xl",
};

type AvatarType = {
  title?: string;
  uppercase?: boolean;
  className?: string;
  size?: "xxxSmall" | "xxSmall" | "xSmall" | "small" | "large";
  variant?: "shadow" | "border" | "default";
  imageSrc?: string;
  onImageClick?: () => void;
};

function Avatar(props: AvatarType) {
  const {
    title,
    className,
    uppercase = true,
    size = "small",
    variant = "default",
    imageSrc,
    onImageClick,
  } = props;

  const VariantClassName = cn({
    "border-4": variant === "border" && size === "large",
    "border-[3px]": variant === "border" && size === "small",
    "border-[2px]": variant === "border" && size === "xSmall",
    border: variant === "border" && (size === "xxSmall" || size === "xxxSmall"),
  });

  const containerClassName = cn(
    `${sizeClassName[size]} ${VariantClassName} ${className} rounded-full inline-flex justify-content items-center text-neutral-800 overflow-hidden`,
    {
      "border-neutral-200": variant === "border",
      "bg-neutral-100": variant === "shadow",
    }
  );

  return (
    <div className={containerClassName}>
      {imageSrc ? (
        <img
          onClick={onImageClick}
          src={imageSrc}
          alt={title}
          className={cn("h-full w-full object-cover", {
            "cursor-pointer": onImageClick,
          })}
        />
      ) : (
        <p className={cn("w-full text-center", { uppercase: uppercase })}>
          {title ?? ""}
        </p>
      )}
    </div>
  );
}

export default Avatar;
