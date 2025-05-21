import EditProfileForm from "@/features/seller/profile/edit-profile-form";

export interface IHandleEditProfile {
  fullName: string;
  phone?: string;
  address?: string;
}

const SellerProfilePage = () => {
  return (
    <div className="flex flex-row justify-around gap-10">
      <div className="min-w-fit">
        <p className="text-2xl font-bold">Your profile</p>
        <p className="text text-gray-700">Edit your profile</p>
      </div>
      <EditProfileForm />
    </div>
  );
};

export default SellerProfilePage;
