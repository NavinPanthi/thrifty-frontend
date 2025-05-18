import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

interface PlaceOrderPayload {
  shippingAddress: string;
}

const placeOrderFromCartApi = async (data: PlaceOrderPayload): Promise<any> => {
  const response = await http.post("/users/cart/place-order", data);
  return response.data;
};

const usePlaceOrderFromCartMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeOrderFromCartApi,

    onSuccess: (data) => {
      toast.success(data?.message || "Order placed successfully.");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/orders", { replace: true });
    },

    onError: (error) => {
      const err = error as ApiError;
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to place order"
      );
    },
  });
};

export default usePlaceOrderFromCartMutation;
