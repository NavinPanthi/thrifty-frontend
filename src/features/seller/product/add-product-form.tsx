import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";
import dayjs from "dayjs";
import { CloudUploadIcon, Delete02Icon } from "hugeicons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import SelectInput from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import TextAreaInput from "@/components/ui/textarea";

import { conditions } from "@/utils/filter-data";

import useAddProductMutation from "@/services/seller/product/use-add-products-mutation";

interface IAddProduct {
  title: string;
  description: string;
  quantity: number;
  productCondition: string;
  price: number;
}

const schema = yup
  .object({
    title: yup.string().required("Product title is required."),
    description: yup
      .string()
      .required("Description is required.")
      .max(200, "Description must be at most 200 characters"),

    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .required("Quantity is required."),
    productCondition: yup.string().required("Condition is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required."),
  })
  .required();

function AddProductForm({
  className,
  toggleDrawer,
}: {
  className?: string;
  toggleDrawer: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddProduct>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const conditionOptions = conditions.map((condition) => ({
    id: condition.id,
    value: condition.id,
    name: condition.title,
  }));

  const [image, setImage] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedImages = Array.from(e.target.files).slice(0, 5);
    setImage((prevImage) => prevImage!.concat(selectedImages));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const imageFiles = Array.from(e.dataTransfer.files);

    const nonImageFile = imageFiles.find(
      (file) => !file.type.startsWith("image/")
    );

    if (nonImageFile) {
      return toast.error("Only images are accepted");
    }

    const filteredImage = imageFiles.slice(0, 5);
    setImage((previousImages) => previousImages!.concat(filteredImage));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const { mutate: addProduct, isPending } = useAddProductMutation({
    reset,
    toggleDrawer,
    setImage,
  });

  const onSubmit: SubmitHandler<IAddProduct> = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("quantity", String(data.quantity));
    formData.append("productCondition", data.productCondition);

    if (image) {
      image.forEach((item) => formData.append("images", item));
    }

    addProduct({ data: formData });
    console.log("Submitting Product:", Object.fromEntries(formData.entries()));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(className)}
      encType="multipart/form-data"
    >
      <p className="my-2 text-2xl font-semibold">Add a product</p>
      <fieldset className="mt-4">
        <Label htmlFor="title">Product title</Label>
        <TextInput
          {...register("title")}
          id="title"
          placeholder="e.g. Wireless Mouse"
          errorMsg={errors.title?.message}
        />
      </fieldset>
      <fieldset className="mt-4">
        <Label htmlFor="productCondition">Condition</Label>
        <SelectInput
          id="productCondition"
          {...register("productCondition")}
          options={conditionOptions}
          title="Select Condition"
          errorMsg={errors.productCondition?.message}
        />
      </fieldset>
      <fieldset className="mt-4">
        <Label htmlFor="description">Description</Label>
        <TextAreaInput
          {...register("description")}
          id="description"
          placeholder="Short description about the product."
          maxLength={200}
          errorMsg={errors.description?.message}
        />
      </fieldset>
      <fieldset className="mt-4">
        <Label htmlFor="price">Price</Label>
        <TextInput
          {...register("price")}
          id="price"
          type="number"
          placeholder="e.g. 49.99"
          errorMsg={errors.price?.message}
        />
      </fieldset>
      <fieldset className="mt-4">
        <Label htmlFor="quantity">Quantity</Label>
        <TextInput
          {...register("quantity")}
          id="quantity"
          type="number"
          placeholder="e.g. 10"
          errorMsg={errors.quantity?.message}
        />
      </fieldset>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label required={false}>Attachment</Label>
          <div className="text-sm font-normal text-neutral-400">
            You can upload image.
          </div>
        </div>

        <fieldset>
          <div
            onDrop={handleDrop}
            onDragOver={handleDrag}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-300 bg-white p-6"
          >
            <label>
              <div className="flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-[14px] border-[1px] p-[8px] shadow-sm">
                <CloudUploadIcon className="text-neutral-600" />
              </div>

              <input
                onChange={handleImageChange}
                type="file"
                multiple
                accept=".jpg, .jpeg, .png"
                className="hidden"
              />
            </label>
            <div className="body-large flex gap-[4px] font-semibold">
              Drag and drop the Image file or
              <label>
                <p className="cursor-pointer text-supporting-info">
                  Select File
                </p>

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
        </fieldset>
        {image && image.length > 0 && (
          <div className="flex w-full flex-col gap-2 overflow-hidden">
            {image.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 p-2"
              >
                <div className="flex gap-2">
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`image_${index}`}
                      className="h-11 w-11 overflow-hidden object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold" title={image.name}>
                      {image.name}
                    </p>
                    <p className="text-sm font-normal text-neutral-500">
                      Uploaded on{" "}
                      {dayjs(image.lastModified).format("DD MMM YYYY")}
                    </p>
                  </div>
                </div>

                <Delete02Icon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    image &&
                      setImage((prevImages) =>
                        prevImages!.filter(
                          (_, imageIndex) => index !== imageIndex
                        )
                      );
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Button type="submit" className="mt-8 w-full" disabled={isPending}>
        Add Product {isPending && " ...."}
      </Button>
    </form>
  );
}

export default AddProductForm;
