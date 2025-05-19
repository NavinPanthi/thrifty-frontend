import { useQuery } from "@tanstack/react-query";

import { getUserData } from "@/utils/auth-storage";
import { checkUser } from "@/utils/check-user";
import http from "@/lib/http";

const getCartItemsApi = async (): Promise<CartItem[] | undefined> => {
  try {
    const response = await http.get("/users/cart");
    return response.data.data.cartItems;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return []; // cart is empty
    }
    throw error; // let other errors bubble up
  }
};

const useGetCartItemsQuery = () => {
  const userData = getUserData();
  const isUSer = checkUser(userData);
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCartItemsApi,
    enabled: !!isUSer,
  });
};

export default useGetCartItemsQuery;
