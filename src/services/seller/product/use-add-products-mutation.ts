import { Dispatch, SetStateAction } from "react";
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
  setImage: Dispatch<SetStateAction<File[]>>;
}

const addProductApi = async ({ data }: AddProductApiParams) => {
  for (const [key, value] of data.entries()) {
    console.log(`${key}:`, value);
  }

  const response = await http.post("/sellers/products", data);
  return response.data;
};

const useAddProductMutation = ({
  reset,
  toggleDrawer,
  setImage,
}: AddProductMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductApi,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      reset();
      setImage([]);

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
