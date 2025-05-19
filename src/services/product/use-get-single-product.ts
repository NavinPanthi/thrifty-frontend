import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

const getSingleProductApi = async (
  productId: string | number
): Promise<Product | undefined> => {
  try {
    const response = await http(`/products/${productId}`);
    return response.data.data;
  } catch (error) {
    const e = error as ApiError;
    toast.error(e?.response?.data?.message || "Failed to fetch product");
  }
};

const useGetSingleProductQuery = (productId: string | number) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProductApi(productId),
    enabled: !!productId,
  });
};

export default useGetSingleProductQuery;
