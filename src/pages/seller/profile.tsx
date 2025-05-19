import EditProfileForm from "@/features/seller/profile/edit-profile-form";

export interface IHandleEditProfile {
  fullName: string;
  phone?: string;
  address?: string;
}

const SellerProfilePage = () => {
  return <EditProfileForm />;
};

export default SellerProfilePage;
