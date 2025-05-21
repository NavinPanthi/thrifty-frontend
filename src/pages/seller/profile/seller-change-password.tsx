import ChangePasswordForm from "@/components/auth/change-password-form";

const SellerChangePassword = () => {
  return (
    <div className="flex flex-row justify-around gap-14">
      <div className="min-w-fit">
        <p className="text-2xl font-bold">Manage password</p>
        <p className="text text-gray-700">Change your password</p>
      </div>
      <ChangePasswordForm />
    </div>
  );
};

export default SellerChangePassword;
