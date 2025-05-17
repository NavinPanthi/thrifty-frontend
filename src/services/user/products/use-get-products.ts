import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

const getProductsApi = async (): Promise<any | undefined> => {
  try {
    const response = await http(`/api/products`, {
      params: { status },
    });
    return response.data.data;
  } catch (error) {
    const e = error as ApiError;
    toast.error(e?.response?.data?.message || "Something went wrong");
  }
};

const useGetUserProductsQuery = ({
  searchParams,
  selectedCondition,
  selectedCategory,
  search,
}: {
  selectedCondition: string[];
  selectedCategory: string[];
  search: string | undefined;
  searchParams: URLSearchParams;
}) => {
  const { id } = useParams();
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "20";
  return useQuery({
    queryKey: ["user-products", id, size, page],
    queryFn: () => getProductsApi(),
    enabled: !!id && !!status,
  });
};

export default useGetUserProductsQuery;
