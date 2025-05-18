import { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { IHandleEditProfile } from "@/pages/seller/profile";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import TextInput from "@/components/ui/text-input";

import { getInitialsTitle } from "@/utils/get-initials-title";

import useEditProfileMutation from "@/services/auth/use-edit-profile-mutation";

const schema = yup
  .object({
    fullName: yup.string().required("Full name is required."),
    phone: yup.string(),
    address: yup.string(),
  })
  .required();
type EditProfileSchema = yup.InferType<typeof schema>;

const EditProfileForm = ({ userData }: { userData: any }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileSchema>({
    resolver: yupResolver(schema),
  });
  const { mutate: editProfile, isPending } = useEditProfileMutation();

  const handleEditProfile: SubmitHandler<IHandleEditProfile> = (data) => {
    const { fullName, phone, address } = data;
    const formData = new FormData();
    formData.set("fullName", fullName);

    if (phone) formData.set("phone", phone);
    if (address) formData.set("address", address);

    editProfile(formData);
  };

  useEffect(() => {
    if (!userData) return;

    reset({
      fullName: userData?.fullName,
      phone: userData?.phone,
      address: userData?.address,
    });
  }, [userData]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mb-4 flex w-full flex-col items-center justify-center gap-4">
        <div className="flex size-40 items-center justify-center rounded-full border border-core-primary-light">
          {getInitialsTitle(userData?.fullName)}
        </div>
        <span className="text-2xl font-semibold">{userData?.fullName}</span>
      </div>
      <form className="mt-6 w-full" onSubmit={handleSubmit(handleEditProfile)}>
        <fieldset>
          <Label htmlFor="fullName">Full name</Label>

          <TextInput
            {...register("fullName")}
            id="fullName"
            placeholder="Enter your full name"
            errorMsg={errors.fullName?.message}
          />
        </fieldset>

        <fieldset className="mt-4">
          <Label htmlFor="email">Email</Label>

          <TextInput value={userData?.email} readOnly />
        </fieldset>

        <fieldset className="mt-4">
          <Label htmlFor="address" required={false}>
            Address
          </Label>
          <TextInput
            {...register("address")}
            id="address"
            placeholder="Enter your address"
            errorMsg={errors.address?.message}
          />
        </fieldset>
        <fieldset className="mt-4">
          <Label htmlFor="phone" required={false}>
            Phone
          </Label>
          <TextInput
            {...register("phone")}
            id="phone"
            placeholder="Enter your phone"
            errorMsg={errors.phone?.message}
          />
        </fieldset>

        <Button
          isLoading={isPending}
          type="submit"
          className="mt-4 w-full"
          size="lg"
        >
          Edit profile
        </Button>
      </form>
    </div>
  );
};

export default EditProfileForm;
