import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

interface CartItem {
  productId: number | string;
  itemQuantity: number;
}

interface AddToCartPayload {
  cartItems: CartItem[];
}

interface AddToCartResponse {
  success: boolean;
  message: string;
}

const addToCartApi = async (
  data: AddToCartPayload
): Promise<AddToCartResponse> => {
  const response = await http.post("/users/cart/add-to-cart", data);
  console.log(response.data);
  return response.data;
};

const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCartApi,

    onSuccess: (data) => {
      toast.success(data?.message || "Item added to cart.");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      const err = error as ApiError;
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to add to cart"
      );
    },
  });
};

export default useAddToCartMutation;
