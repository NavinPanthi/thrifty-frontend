import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { IHandleSignUp } from "@/pages/auth/sign-up";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

const SignUpApi = async (data: IHandleSignUp) => {
  const response = await http.post(`/public/register`, data);
  return { ...response.data };
};

const useSignUpMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: SignUpApi,

    onSuccess: (data) => {
      toast.success(data?.message || "User registered.");
      navigate("/log-in", { replace: true });
    },

    onError: (error) => {
      const e = error as ApiError;
      console.log(e);
      toast.error(
        e?.response?.data?.message || e?.message || "Something went wrong"
      );
    },
  });
};

export default useSignUpMutation;
