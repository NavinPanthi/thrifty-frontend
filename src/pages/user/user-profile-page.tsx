import Footer from "@/features/landing/footer";
import Navbar from "@/features/landing/navbar";
import EditProfileForm from "@/features/seller/profile/edit-profile-form";

const UserProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-around gap-10 px-4 py-28 lg:px-28">
        <div>
          <p className="text-2xl font-bold">Your profile</p>
          <p className="text text-gray-700">Edit your profile</p>
        </div>
        <EditProfileForm />
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
