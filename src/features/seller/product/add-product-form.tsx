import { createFileSchema } from "@/schemas";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import SelectInput from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import TextAreaInput from "@/components/ui/textarea";

import useFileUpload from "@/hooks/use-file-upload";
import { conditions } from "@/utils/filter-data";

const schema = yup
  .object({
    title: yup.string().required("Product title is required."),
    description: yup.string().required("Description is required."),
    quantity: yup.number().required("Description is required."),
    productCondition: yup.string().required("condition is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required."),
    image: createFileSchema({}),
  })
  .required();

type AddProduct = yup.InferType<typeof schema>;

function AddProductForm({
  className,
  closeModal,
}: {
  className?: string;
  closeModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    resetField,
    formState: { errors },
  } = useForm<AddProduct>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const conditionOptions = conditions.map((condition) => ({
    id: condition.id,
    value: condition.id,
    name: condition.title,
  }));

  const { handleDrag: handleImageDrag, handleDrop: handleImageDrop } =
    useFileUpload<AddProduct>({
      setValue,
      setError,
      clearErrors,
      fieldName: "image",
    });

  const image = watch("image")?.[0];

  const onSubmit: SubmitHandler<AddProduct> = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("productCondition", data.productCondition);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    if (image) formData.append("image", image);

    // TODO: Call your mutation function here
    console.log("Submitting Product: ", Object.fromEntries(formData.entries()));

    reset();
    closeModal();
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
      <fieldset>
        <Label htmlFor="category">Category</Label>
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
        <Label helpText="You can upload Jpg image file.">Drawing Image</Label>

        <div
          onDrop={handleImageDrop}
          onDragOver={handleImageDrag}
          className="mt-2 flex h-28 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50"
        >
          {image && !errors.image && image instanceof File ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="image"
                className="h-20 w-20 object-cover"
              />
              <XMarkIcon
                onClick={() => resetField("image")}
                height={22}
                width={22}
                className="absolute inset-y-0 right-0 cursor-pointer rounded-full bg-neutral-50 p-1"
              />
            </div>
          ) : (
            <div className="p-6">
              <p className="body-large">Drag and drop the Image file.</p>
              <label className="mt-2 flex justify-center">
                <div className="w-fit cursor-pointer rounded-full border-2 border-core-primary bg-white px-2.5 py-2 text-center">
                  <p className="body-body-default-semibold text-core-primary">
                    Browse Image
                  </p>
                </div>
                <input
                  {...register("image")}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>

              {errors.image && (
                <p className="mt-2 text-center text-sm text-red-500">
                  {errors.image?.message}
                </p>
              )}
            </div>
          )}
        </div>
      </fieldset>
      <Button type="submit" className="mt-8 w-full">
        Add Product
      </Button>
    </form>
  );
}

export default AddProductForm;
