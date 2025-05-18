import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

const getSellerProductsApi = async ({
  searchParams,
  selectedCategory,
  selectedCondition,
  search,
  verified,
}: {
  searchParams: URLSearchParams;
  selectedCategory?: string[];
  search?: string;
  selectedCondition?: string[];
  verified?: boolean | string;
}): Promise<ProductListData | undefined> => {
  const searchQueryParams = new URLSearchParams(searchParams);
  if (search) {
    searchQueryParams.set("search", search);
  }

  if (selectedCategory && selectedCategory?.length > 0) {
    selectedCategory?.forEach((element) => {
      searchQueryParams.append("categoryIds", element);
    });
  }

  if (selectedCondition && selectedCondition.length > 0) {
    selectedCondition.forEach((element) => {
      searchQueryParams.append("conditions", element);
    });
  }

  ["page", "size"].forEach((param) => {
    const value = searchParams.get(param);
    if (value) searchQueryParams.set(param, value);
  });

  if (verified !== "" && verified !== undefined) {
    searchQueryParams.append("verified", verified.toString());
  }

  try {
    const response = await http(`/sellers/products`, {
      params: searchQueryParams,
    });
    return response.data.data;
  } catch (error) {
    const e = error as ApiError;
    toast.error(e?.response?.data?.message || "Something went wrong");
  }
};

const useGetSellerProductsQuery = ({
  searchParams,
  selectedCondition,
  selectedCategory,
  search,
  verified,
}: {
  selectedCondition?: string[];
  selectedCategory?: string[];
  search?: string;
  searchParams: URLSearchParams;
  verified?: boolean | string;
}) => {
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "20";
  const [debounceSearch] = useDebounce(search, 500);

  return useQuery({
    queryKey: [
      "seller-products",
      size,
      page,
      selectedCondition,
      selectedCategory,
      search,
      debounceSearch,
      verified,
    ],
    queryFn: () =>
      getSellerProductsApi({
        searchParams,
        selectedCondition,
        selectedCategory,
        search,
        verified,
      }),
  });
};

export default useGetSellerProductsQuery;
