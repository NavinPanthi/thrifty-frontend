import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { SubmitHandler } from "react-hook-form";

import AuthLogInLayout from "@/components/auth/auth-login-layout";
import LoginForm from "@/components/auth/login-form";

import { RootState } from "@/redux/store";

import useLoginMutation from "@/services/auth/use-login-mutation";

interface IHandleLogin {
  email: string;
  password: string;
  isRememberMe?: boolean;
}

function Login() {
  const loginStatus = useSelector<RootState>((state) => state.user.loginStatus);

  const { mutate: login, isPending } = useLoginMutation();

  const handleLogin: SubmitHandler<IHandleLogin> = (data) => {
    login(data);
  };

  if (loginStatus) {
    return <Navigate replace={true} to="/" />;
  }

  return (
    <AuthLogInLayout>
      <LoginForm handleLogin={handleLogin} isPending={isPending} />
    </AuthLogInLayout>
  );
}

export default Login;
