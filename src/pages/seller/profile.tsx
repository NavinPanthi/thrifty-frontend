import EditProfileForm from "@/features/seller/profile/edit-profile-form";

import { getUserData } from "@/utils/auth-storage";

export interface IHandleEditProfile {
  fullName: string;
  phone?: string;
  address?: string;
}

const SellerProfilePage = () => {
  const userData = getUserData();
  return <EditProfileForm userData={userData} />;
};

export default SellerProfilePage;
