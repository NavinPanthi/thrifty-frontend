import { MAXIMUM_FILE_SIZE } from "@/constant";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

type FileUploadType<T extends FieldValues> = {
  multiple?: boolean;
  setValue: UseFormSetValue<T>;
  fieldName?: Path<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  type?: "image" | "file";
};

const useFileUpload = <T extends FieldValues>({
  multiple = false,
  setValue,
  fieldName = "file" as Path<T>,
  setError,
  clearErrors,
  type = "image",
}: FileUploadType<T>) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);

    if (!multiple && files.length > 1) {
      setError(fieldName, {
        type: "onChange",
        message: "Only 1 file isAllowed",
      });
      return;
    }

    for (const file of files) {
      if (type === "image" && !file.type.startsWith("image/")) {
        setError(fieldName, {
          message: "Only Image isAllowed",
        });
        return;
      }
      if (type === "file" && !file.type.startsWith("application/")) {
        setError(fieldName, {
          message: "Only File is Allowed",
        });
        return;
      }

      if (file.size >= MAXIMUM_FILE_SIZE) {
        setError(fieldName, {
          type: "onChange",
          message: "File size must be less than 5 MB",
        });
        return;
      }
    }

    setValue(fieldName, files as PathValue<T, Path<T>>);
    clearErrors(fieldName);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return { handleDrag, handleDrop };
};

export default useFileUpload;
