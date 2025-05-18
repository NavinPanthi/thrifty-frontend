import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

const getSellerProductsApi = async ({
  searchParams,
  orderStatus,
}: {
  searchParams: URLSearchParams;
  orderStatus?: string;
}): Promise<OrdersData | undefined> => {
  const searchQueryParams = new URLSearchParams(searchParams);

  ["page", "size"].forEach((param) => {
    const value = searchParams.get(param);
    if (value) searchQueryParams.set(param, value);
  });

  if (orderStatus !== "" && orderStatus !== undefined) {
    searchQueryParams.append("status", orderStatus);
  }

  try {
    const response = await http(`/sellers/orders`, {
      params: searchQueryParams,
    });
    return response.data.data;
  } catch (error) {
    const e = error as ApiError;
    toast.error(e?.response?.data?.message || "Something went wrong");
  }
};

const useGetSellerOrdersQuery = ({
  searchParams,
  orderStatus,
}: {
  orderStatus?: string;
  searchParams: URLSearchParams;
}) => {
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "20";

  return useQuery({
    queryKey: ["seller-products", size, page, orderStatus],
    queryFn: () =>
      getSellerProductsApi({
        searchParams,
        orderStatus,
      }),
  });
};

export default useGetSellerOrdersQuery;
