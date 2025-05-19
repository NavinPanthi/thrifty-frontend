import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";

import { ApiError } from "@/@types/apiError";

interface AddProductApiParams {
  data: FormData;
}

interface AddProductMutationProps {
  reset: () => void;
  toggleDrawer?: () => void;
}

const addProductApi = async ({ data }: AddProductApiParams) => {
  const response = await http.post("/api/sellers/products", data);
  return response.data;
};

const useAddProductMutation = ({
  reset,
  toggleDrawer,
}: AddProductMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductApi,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      if (toggleDrawer) toggleDrawer();
      toast.success(data?.message || "Product successfully added");
    },

    onError: (error) => {
      const e = error as ApiError;
      toast.error(e?.response?.data?.message || "Something went wrong");
    },
  });
};

export default useAddProductMutation;
