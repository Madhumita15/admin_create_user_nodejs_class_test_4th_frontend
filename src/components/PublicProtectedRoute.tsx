import { useAppSeletor } from "../services/helper/redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicProtectedRoute = () => {
  const { isAuthinticated, role, profileFetched } = useAppSeletor(
    (state) => state.user,
  );

  // console.log("user",user)
  if (!profileFetched) {
    return <p>Loading...</p>;
  }

  if (isAuthinticated) {
    return role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    )  : (
      <Navigate to="/user/dashboard" replace />
    );
  }

  return <Outlet />;
};

export default PublicProtectedRoute;
