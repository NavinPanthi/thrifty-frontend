import { CloudUploadIcon, Delete02Icon } from "hugeicons-react";

import { formatDate } from "@/utils/format-date";

type ImageUploadType = {
  image: File[];
  setImage: React.Dispatch<React.SetStateAction<File[]>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ImageUpload({ image, setImage, handleImageChange }: ImageUploadType) {
  function deleteImage(index: number) {
    setImage((prevImages) =>
      prevImages!.filter((_, imageIndex) => index !== imageIndex)
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-300 bg-white p-6">
        <>
          <div className="flex size-12 cursor-pointer items-center justify-center rounded-[14px] border p-2 shadow-sm">
            <CloudUploadIcon className="text-neutral-600" />
          </div>

          <input
            onChange={handleImageChange}
            type="file"
            accept=".jpg, .jpeg, .png"
            className="hidden"
          />
        </>
        <div className="body-large flex gap-1 font-semibold">
          Drag and drop the Image file or
          <label>
            <div className="cursor-pointer text-supporting-info">
              Select File
            </div>

            <input
              onChange={handleImageChange}
              type="file"
              multiple
              accept=".jpg, .jpeg, .png"
              className="hidden"
            />
          </label>
        </div>
        <div className="text-sm font-normal text-neutral-400">
          Supported format jpg, jpeg file.
        </div>
      </div>
      {image && image.length > 0 && (
        <div className="mt-2 flex w-full flex-col gap-2">
          {image.map((image, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 p-2"
            >
              <div className="flex gap-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`image_${index}`}
                  className="size-14 object-cover"
                />
                <div className="flex w-fit flex-col gap-1">
                  <p className="break-all text-sm font-semibold">
                    {image.name}
                  </p>
                  <p className="text-sm font-normal text-neutral-500">
                    Uploaded on {formatDate(new Date(image.lastModified))}
                  </p>
                </div>
              </div>

              <Delete02Icon
                className="h-6 w-6 shrink-0 cursor-pointer text-supporting-error"
                onClick={() => deleteImage(index)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ImageUpload;
