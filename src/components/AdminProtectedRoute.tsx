
import { useAppSeletor } from "../services/helper/redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { isAuthinticated, role, profileFetched } = useAppSeletor(
    (state) => state.user,
  );

  if (!profileFetched) {
    return <p>Loading...</p>;
  }
  if (!isAuthinticated) {
    return <Navigate to={"/login"} />;
  }

  if (isAuthinticated && role === "user") {
    return <Navigate to={"/user/dashboard"} />;
  }

  return <Outlet />;
};
export default AdminProtectedRoute;
