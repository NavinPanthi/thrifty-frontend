import { ArrowDown01Icon, ArrowUp01Icon } from "hugeicons-react";

const Accordion = ({
  title,
  children,
  isAccordionActive,
  setIsAccordionActive,
}: {
  title: string;
  children?: React.ReactNode;
  isAccordionActive: boolean;
  setIsAccordionActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <>
        <div className="w-full cursor-pointer">
          <p
            className="flex items-center justify-between"
            onClick={() => setIsAccordionActive(!isAccordionActive)}
          >
            {title}{" "}
            <span>
              {" "}
              {isAccordionActive ? <ArrowUp01Icon /> : <ArrowDown01Icon />}
            </span>{" "}
          </p>
        </div>
        {isAccordionActive && (
          <div className="pt-2 text-gray-500">{children}</div>
        )}
      </>
    </div>
  );
};
export default Accordion;
