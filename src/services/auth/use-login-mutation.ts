import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

import { setLogin } from "@/redux/slices/user-slice";
import { checkAdmin } from "@/utils/check-admin";
import { checkSeller } from "@/utils/check-seller";
import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

interface ILoginProps {
  email: string;
  password: string;
  isRememberMe?: boolean;
}

const LoginApi = async (data: ILoginProps) => {
  const response = await http.post(`/public/login`, data);
  console.log(response.data);
  return { ...response.data, isRememberMe: data.isRememberMe };
};

const useLoginMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: LoginApi,

    onSuccess: (data) => {
      dispatch(
        setLogin({
          token: data?.data.token,
          userData: data?.data,
          isRememberMe: data.isRememberMe,
        })
      );

      toast.success(data?.message || "Login successful");
      navigate(
        checkAdmin(data?.data)
          ? "/admin/products"
          : checkSeller(data?.data)
            ? "/seller/products"
            : "/",
        { replace: true }
      );
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

export default useLoginMutation;
