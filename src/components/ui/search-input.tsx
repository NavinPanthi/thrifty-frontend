import TextInput from "./text-input";

interface SearchInputProps {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  containerClassName?: string;
}

function SearchInput({
  value,
  onChange,
  placeholder,
  className,
  containerClassName,
}: SearchInputProps) {
  return (
    <TextInput
      inputClassName={className}
      containerClassName={containerClassName}
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchInput;
