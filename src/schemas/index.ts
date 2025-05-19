// import { MAXIMUM_FILE_SIZE } from "@/constant";
// import * as yup from "yup";

// export const fileSchema = yup
//   .mixed<FileList | string>()
//   .test(
//     "file-exist",
//     "Please select a file",
//     (value) => !!value && value.length > 0
//   )
//   .test("file-length", "Only 1 file is allowed", (value) => {
//     if (value instanceof File) {
//       return value && value.length === 1;
//     } else {
//       return true;
//     }
//   })
//   .test("file-size", "File size must be less than 5 MB", (value) => {
//     if (!value) return false;

//     if (value instanceof File) {
//       return value && value[0]?.size <= MAXIMUM_FILE_SIZE;
//     } else {
//       return true;
//     }
//   })
//   .required("File is required");

import { MAXIMUM_FILE_SIZE } from "@/constant";
import * as yup from "yup";

export const fileSchema = yup
  .mixed<FileList | string>()
  .test("file-exist", "Please select a file", (value) => {
    // Ensure the value exists and has a length (for FileList) or is a valid string
    return !!value && (typeof value === "string" || value.length > 0);
  })
  .test("file-length", "Only 1 file is allowed", (value) => {
    // Validate if the value is a FileList with exactly one file
    return !(value instanceof FileList) || value.length === 1;
  })
  .test("file-size", "File size must be less than 5 MB", (value) => {
    // Validate file size if the value is a FileList
    return !(value instanceof FileList) || value[0]?.size <= MAXIMUM_FILE_SIZE;
  })
  .required("File is required");

export const optionalFileSchema = yup
  .mixed<FileList | string>()

  .test("file-length", "Only 1 file is allowed", (value) => {
    return !(value instanceof FileList) || value.length <= 1;
  })
  .test("file-size", "File size must be less than 5 MB", (value) => {
    // Validate file size if the value is a FileList

    if (value?.length === 0) return true;

    return !(value instanceof FileList) || value[0]?.size <= MAXIMUM_FILE_SIZE;
  })
  .optional();

export const createFileSchema = ({
  isRequired = true,
  multiple = false,
}: {
  isRequired?: boolean;
  multiple?: boolean;
}) => {
  return yup
    .mixed<FileList | string>()
    .test(
      "file-exist",
      isRequired ? "Please select a file" : "File selection is optional",
      (value) => {
        // Ensure the value exists and has a length (for FileList) or is a valid string
        return (
          !isRequired ||
          (!!value && (typeof value === "string" || value.length > 0))
        );
      }
    )
    .test("file-length", "Only 1 file is allowed", (value) => {
      // Validate if the value is a FileList with exactly one file

      if (!isRequired) {
        return true;
      }
      if (!multiple) {
        return !(value instanceof FileList) || value.length <= 1;
      }

      return !(value instanceof FileList) || value.length >= 1;
    })
    .test("file-size", "File size must be less than 5 MB", (value) => {
      if (typeof value === "string") {
        return true;
      }

      if (!isRequired && !value) {
        return true;
      }

      if (value instanceof FileList && value.length >= 1) {
        const isValid = Array.from(value).every(
          (value) => value?.size <= MAXIMUM_FILE_SIZE
        );

        return isValid;
      }

      return isRequired || value?.length === 0;
    })
    .nullable();
};
