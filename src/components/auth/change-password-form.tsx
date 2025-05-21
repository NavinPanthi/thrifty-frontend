import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import TextInput from "@/components/ui/text-input";

const schema = yup
  .object({
    oldPassword: yup.string().required("Old password is required."),
    newPassword: yup
      .string()
      .required("New password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: yup
      .string()
      .required("Please confirm your new password.")
      .oneOf([yup.ref("newPassword")], "Passwords must match."),
  })
  .required();

type ChangePasswordSchema = yup.InferType<typeof schema>;

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(schema),
  });

  // Replace with your actual mutation logic
  const isPending = false;
  const changePassword = (data: ChangePasswordSchema) => {
    console.log("Submitting change password:", data);
    reset();
  };

  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    changePassword(data);
  };

  return (
    <form className="mx-auto mt-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <Label htmlFor="oldPassword">Old Password</Label>
        <TextInput
          {...register("oldPassword")}
          id="oldPassword"
          type="password"
          placeholder="Enter old password"
          errorMsg={errors.oldPassword?.message}
        />
      </fieldset>

      <fieldset className="mt-4">
        <Label htmlFor="newPassword">New Password</Label>
        <TextInput
          {...register("newPassword")}
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          errorMsg={errors.newPassword?.message}
        />
      </fieldset>

      <fieldset className="mt-4">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <TextInput
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          errorMsg={errors.confirmPassword?.message}
        />
      </fieldset>

      <Button
        type="submit"
        className="mt-6 w-full"
        size="lg"
        isLoading={isPending}
      >
        Change Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
