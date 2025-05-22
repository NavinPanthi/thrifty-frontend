import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import TextInput from "@/components/ui/text-input";

import { resetLogin } from "@/redux/slices/user-slice";
import cn from "@/lib/classnames";

import useChangePasswordMutation from "@/services/auth/use-change-password-mutation";

const schema = yup
  .object({
    old_password: yup.string().required("Old password is required."),
    new_password: yup
      .string()
      .required("New password is required.")
      .min(6, "Password must be at least 6 characters."),
    re_new_password: yup
      .string()
      .required("Please confirm your new password.")
      .oneOf([yup.ref("new_password")], "Passwords must match."),
  })
  .required();

type ChangePasswordSchema = yup.InferType<typeof schema>;

const ChangePasswordForm = ({ className }: { className?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(schema),
  });
  const dispatchData = () => {
    queryClient.removeQueries();
    dispatch(resetLogin());
    navigate("/log-in");
  };
  const { mutate: changePassword, isPending } = useChangePasswordMutation({
    reset,
    dispatchData,
  });
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    changePassword(data);
  };

  return (
    <form
      className={cn("mx-auto mt-6 w-full", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset>
        <Label htmlFor="oldPassword">Old Password</Label>
        <TextInput
          {...register("old_password")}
          id="old_password"
          isPasswordInput={true}
          placeholder="Enter old password"
          errorMsg={errors.old_password?.message}
        />
      </fieldset>

      <fieldset className="mt-4">
        <Label htmlFor="new_password">New Password</Label>
        <TextInput
          {...register("new_password")}
          id="new_password"
          isPasswordInput={true}
          placeholder="Enter new password"
          errorMsg={errors.new_password?.message}
        />
      </fieldset>

      <fieldset className="mt-4">
        <Label htmlFor="re_new_password">Confirm New Password</Label>
        <TextInput
          {...register("re_new_password")}
          id="re_new_password"
          isPasswordInput={true}
          placeholder="Confirm new password"
          errorMsg={errors.re_new_password?.message}
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
