import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
  required?: boolean;
  helpText?: string;
}

function Label({
  children,
  required = true,
  htmlFor,
  className,
  helpText,
  ...rest
}: LabelProps) {
  return (
    <>
      <label htmlFor={htmlFor} className={`label ${className}`} {...rest}>
        {children}
        {required && <span className="text-supporting-error">*</span>}
      </label>

      {helpText && (
        <p className="body-default mb-2 text-neutral-400">{helpText}</p>
      )}
    </>
  );
}

export default Label;
