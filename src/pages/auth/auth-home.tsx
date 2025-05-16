import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

const AuthHome = () => {
  const loginStatus = useSelector<RootState>((state) => state.user.loginStatus);

  if (!loginStatus) {
    // return <Navigate to="/login" />;
  }
  return <></>;
};

export default AuthHome;
