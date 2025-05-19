import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

const verifyProductApi = async (productId?: string | number): Promise<any> => {
  const numId = Number(productId);
  const response = await http.patch(`/admin/verify-product/${numId}`);
  return response.data;
};

const useVerifyProductMutation = (toggleDrawer?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyProductApi,

    onSuccess: (data) => {
      toast.success(data?.message || "Product verified successfully.");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      if (toggleDrawer) toggleDrawer();
    },

    onError: (error) => {
      const err = error as ApiError;
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to verify product"
      );
    },
  });
};

export default useVerifyProductMutation;
