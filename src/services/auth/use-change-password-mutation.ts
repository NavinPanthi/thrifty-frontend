import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  re_new_password: string;
}

const changePasswordApi = async (data: ChangePasswordPayload): Promise<any> => {
  const response = await http.patch("/users/change-password", data);
  return response.data;
};

const useChangePasswordMutation = ({
  reset,
  dispatchData,
}: {
  reset: () => void;
  dispatchData: () => void;
}) => {
  return useMutation({
    mutationFn: changePasswordApi,

    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully.");
      dispatchData();
      reset();
    },

    onError: (error) => {
      const err = error as ApiError;
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to change password"
      );
    },
  });
};

export default useChangePasswordMutation;
