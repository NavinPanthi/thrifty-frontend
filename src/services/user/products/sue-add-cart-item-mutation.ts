import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

const removeCartItemApi = async (id: number | string): Promise<any> => {
  const response = await http.patch(
    `/users/cart/add-item-quantity`,
    {},
    {
      params: { id },
    }
  );
  return response.data;
};

const useAddCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItemApi,

    onSuccess: (data) => {
      toast.success(data?.message || "Item added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (error) => {
      const err = error as ApiError;
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to add item"
      );
    },
  });
};

export default useAddCartItemMutation;
