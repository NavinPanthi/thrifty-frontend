import Footer from "@/features/landing/footer";
import Navbar from "@/features/landing/navbar";
import ChangePasswordForm from "@/components/auth/change-password-form";

const ChangePasswordFormPage = () => {
  return (
    <>
      <Navbar />
      <ChangePasswordForm className="items-center justify-around gap-10 px-4 py-28 lg:px-28" />
      <Footer />
    </>
  );
};

export default ChangePasswordFormPage;
