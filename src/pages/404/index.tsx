import { Link } from "react-router-dom";

import cn from "@/lib/classnames";

type PageNotFoundProps = {
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  showHomeButton?: boolean;
};

function PageNotFound({
  className,
  titleClassName,
  descriptionClassName,
  showHomeButton,
}: PageNotFoundProps) {
  return (
    <div
      className={cn(
        "flex min-h-[90vh] flex-col items-center justify-center",
        className
      )}
    >
      <h1 className={cn("text-6xl font-bold text-neutral-900", titleClassName)}>
        Oops! Looks like you&apos;re lost.
      </h1>
      <p
        className={cn(
          "mt-4 text-2xl font-semibold text-neutral-600",
          descriptionClassName
        )}
      >
        The Page you are looking for does&apos;t exists.
      </p>

      {showHomeButton && (
        <Link
          to="/"
          className="primary-btn-lg mt-4 rounded-full text-shade-light"
        >
          Go Home
        </Link>
      )}
    </div>
  );
}

export default PageNotFound;
