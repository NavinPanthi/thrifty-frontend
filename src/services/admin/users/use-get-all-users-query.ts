import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";
import { UsersData } from "@/@types/users-api-response";

const fetchAllUsers = async ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}): Promise<UsersData | undefined> => {
  const searchQueryParams = new URLSearchParams(searchParams);
  ["page", "size"].forEach((param) => {
    const value = searchParams.get(param);
    if (value) searchQueryParams.set(param, value);
  });

  try {
    const response = await http(`/admin/all-users`, {
      params: searchQueryParams,
    });
    return response.data.data;
  } catch (error) {
    const e = error as ApiError;
    toast.error(e?.response?.data?.message || "Something went wrong");
  }
};

const useGetAllUsersQuery = ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "20";

  return useQuery({
    queryKey: ["admin-users", searchParams.toString(), size, page],
    queryFn: () => fetchAllUsers({ searchParams }),
  });
};

export default useGetAllUsersQuery;
