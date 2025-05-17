import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http"; // your axios instance

import { ApiError } from "@/@types/apiError";

export interface ICategory {
  id: string;
  name: string;
}

const getCategoriesApi = async (): Promise<ICategory[] | undefined> => {
  try {
    const response = await http.get("/api/categories");
    return response.data.data;
  } catch (error) {
    const e = error as ApiError;
    toast.error(e?.response?.data?.message || "Failed to load categories");
  }
};

const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
  });
};

export default useGetCategoriesQuery;
