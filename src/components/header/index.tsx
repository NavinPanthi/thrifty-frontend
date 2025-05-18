import cn from "@/lib/classnames";

import Button from "../ui/button";

interface IHeader {
  title: string;
  description?: string;
  actionName?: string;
  actionCallback?: () => void;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  ActionComponent?: React.ReactElement;
}

const Header = (props: IHeader) => {
  const {
    title,
    description,
    actionName,
    actionCallback,
    className,
    titleClassName,
    descriptionClassName,
    ActionComponent,
  } = props;

  return (
    <div className={cn("flex items-center justify-between gap-1", className)}>
      <div>
        <p className={cn("title-section text-neutral-900", titleClassName)}>
          {title}
        </p>
        {description && (
          <p
            className={cn("body-large text-neutral-600", descriptionClassName)}
          >
            {description}
          </p>
        )}
      </div>
      {(actionName || ActionComponent) && actionCallback && (
        <Button onClick={actionCallback} rounded="md">
          {actionName ?? ActionComponent}
        </Button>
      )}
    </div>
  );
};

export default Header;
