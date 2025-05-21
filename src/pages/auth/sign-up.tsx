import { useState } from "react";

import { SubmitHandler } from "react-hook-form";

import AuthSignUpLayout from "@/components/auth/auth-signup-layout";
import SignUpForm from "@/components/auth/signup-form";

import useSignUpMutation from "@/services/auth/use-signup-mutation";

// const roles = ["admin", "user", "seller"] as const;

// export type roleType = (typeof roles)[number];

export interface IHandleSignUp {
  fullName: string;
  email: string;
  password: string;
  profilePicture?: string;
  phone: string;
  address: string;
}

const SignUp = () => {
  const [isSignUpAsSeller, setIsSignUpAsSeller] = useState(false);
  const { mutate: signUp, isPending } = useSignUpMutation();
  const handleSignUp: SubmitHandler<IHandleSignUp> = (data) => {
    const { fullName, email, password, phone, address } = data;
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);

    // const roles = [];
    // if (isSignUpAsSeller) {
    //   roles.push("seller");
    //   formData.append("roles", roles);
    // }
    signUp(formData);
  };
  const handleSignUpAsSeller = () => {
    setIsSignUpAsSeller(!isSignUpAsSeller);
  };
  return (
    <AuthSignUpLayout>
      <SignUpForm
        handleSignUp={handleSignUp}
        isPending={isPending}
        isSignUpAsSeller={isSignUpAsSeller}
        setIsSignUpAsSeller={handleSignUpAsSeller}
      />
    </AuthSignUpLayout>
  );
};

export default SignUp;
