import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

const getAllOrdersApi = async (): Promise<Order[] | undefined> => {
  try {
    const response = await http.get("/users/orders");
    return response.data.data;
  } catch (error) {
    const e = error as ApiError;
    toast.error(e?.response?.data?.message || "Failed to fetch orders");
  }
};

const useGetAllOrdersForUserQuery = () => {
  const location = useLocation();

  return useQuery({
    queryKey: ["user-orders"],
    queryFn: () => getAllOrdersApi(),
    enabled: location.pathname === "/orders",
  });
};

export default useGetAllOrdersForUserQuery;
