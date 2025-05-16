import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "../ui/button";
import Label from "../ui/label";
import TextInput from "../ui/text-input";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email must be valid.")
      .required("Email is required."),
    password: yup.string().required("Password is required."),
    fullName: yup.string().required("Full name is required."),
    phone: yup.string(),
    address: yup.string(),
  })
  .required();

type SignUpSchemaType = yup.InferType<typeof schema>;

const SignUpForm = ({
  handleSignUp,
  isPending,
  isSignUpAsSeller,
  setIsSignUpAsSeller,
}: {
  handleSignUp: SubmitHandler<SignUpSchemaType>;
  isPending: boolean;
  isSignUpAsSeller: boolean;
  setIsSignUpAsSeller: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: yupResolver(schema),
  });

  return (
    <form className="mt-6" onSubmit={handleSubmit(handleSignUp)}>
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

        <TextInput
          {...register("email")}
          id="email"
          placeholder="Enter your email"
          errorMsg={errors.email?.message}
        />
      </fieldset>

      <fieldset className="mt-4">
        <Label htmlFor="password">Password</Label>
        <TextInput
          {...register("password")}
          id="password"
          isPasswordInput
          placeholder="Enter your password"
          errorMsg={errors.password?.message}
        />
      </fieldset>

      <fieldset className="mt-4">
        <Label htmlFor="address" required={false}>
          Address
        </Label>
        <TextInput
          {...register("address")}
          id="address"
          isPasswordInput
          placeholder="Enter your address"
          errorMsg={errors.password?.message}
        />
      </fieldset>

      <fieldset className="mt-4">
        <Label htmlFor="phone" required={false}>
          Phone
        </Label>
        <TextInput
          {...register("phone")}
          id="phone"
          isPasswordInput
          placeholder="Enter your phone"
          errorMsg={errors.password?.message}
        />
      </fieldset>

      <Button
        className="mt-8 w-full"
        size="lg"
        variant="tertiary"
        type="button"
        onClick={() => {
          setIsSignUpAsSeller();
        }}
      >
        Sign up as a {isSignUpAsSeller ? "user" : "seller"}
      </Button>
      <Button
        isLoading={isPending}
        type="submit"
        className="mt-4 w-full"
        size="lg"
      >
        Sign up
      </Button>
    </form>
  );
};

export default SignUpForm;
