import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

const getProductsApi = async ({
  searchParams,
  selectedCategory,
  selectedCondition,
  debounceSearch,
}: {
  searchParams: URLSearchParams;
  selectedCategory?: string[];
  debounceSearch?: string;
  selectedCondition?: string[];
}): Promise<ProductListData | undefined> => {
  const searchQueryParams = new URLSearchParams(searchParams);
  if (debounceSearch) {
    searchQueryParams.set("search", debounceSearch);
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

  try {
    const response = await http(`/products`, {
      params: searchQueryParams,
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
  selectedCondition?: string[];
  selectedCategory?: string[];
  search?: string;
  searchParams: URLSearchParams;
}) => {
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "20";
  const [debounceSearch] = useDebounce(search, 500);

  return useQuery({
    queryKey: [
      "products",
      size,
      page,
      selectedCondition,
      selectedCategory,
      debounceSearch,
      debounceSearch,
    ],
    queryFn: () =>
      getProductsApi({
        searchParams,
        selectedCondition,
        selectedCategory,
        debounceSearch,
      }),
  });
};

export default useGetUserProductsQuery;
