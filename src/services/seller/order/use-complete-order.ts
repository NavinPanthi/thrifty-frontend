import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

// API function
const completeOrderApi = async (orderId: number | string) => {
  const response = await http.patch(
    `/sellers/orders/complete-order/${orderId}`
  );
  return response.data;
};

// Custom mutation hook
const useCompleteOrderMutation = (closeModal?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeOrderApi,

    onSuccess: (data) => {
      toast.success(data?.message || "Order marked as complete.");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["seller-orders"] });
      if (closeModal) closeModal();
    },

    onError: (error) => {
      const err = error as ApiError;
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to complete order"
      );
    },
  });
};

export default useCompleteOrderMutation;
