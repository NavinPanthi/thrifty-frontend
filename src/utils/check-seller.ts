import { IUser } from "@/redux/slices/user-slice";

export const checkSeller = (userData: IUser) => {
  return userData?.roles.includes("seller") ? true : false;
};
