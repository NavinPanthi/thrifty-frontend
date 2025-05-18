import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

interface AddReviewPayload {
  productId?: number | string;
  comment: string;
  rating: number;
}

interface AddReviewResponse {
  success: boolean;
  message: string;
}

const addReviewApi = async ({
  productId,
  comment,
  rating,
}: AddReviewPayload): Promise<AddReviewResponse> => {
  const response = await http.post(`/users/products/${productId}/reviews`, {
    comment,
    rating,
  });
  return response.data.data;
};

const useAddReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addReviewApi,

    onSuccess: (data) => {
      toast.success(data?.message || "Review added successfully.");
      queryClient.invalidateQueries({ queryKey: ["review"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (error) => {
      const err = error as ApiError;
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to add review"
      );
    },
  });
};

export default useAddReviewMutation;
