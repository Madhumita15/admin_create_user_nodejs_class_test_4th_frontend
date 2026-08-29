import {  useAppSeletor } from "../services/helper/redux";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const { isAuthinticated, role, profileFetched } = useAppSeletor(
    (state) => state.user
  );

   if (!profileFetched) {
    return <p>Loading...</p>;
  }

  if (!isAuthinticated) {
    return <Navigate to="/login" replace />;
  }

  if ( role === "admin") {
    return <Navigate to={"/admin/dashboard"} replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
