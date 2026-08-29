import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import UserManagement from "../pages/admin/UserManagement";
import Dashboard from "../pages/admin/Dashboard";
import UpdatePassword from "../pages/auth/UpdatePassword";
import Home from "../pages/user/Home";
import UserDashboard from "../pages/user/UserDashboard";
import PublicProtectedRoute from "../components/PublicProtectedRoute";
import AdminProtectedRoute from "../components/AdminProtectedRoute";
import Wrapper from "../layout/adminLaylout/Wrapper";
import UserProtectedRoute from "../components/UserProtectedRoute";

const Routes = createBrowserRouter([
  {
    element: <PublicProtectedRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/update-password",
    element: <UserProtectedRoute />,
    children: [
      {
        index: true,
        element: <UpdatePassword />,
      },
    ],
  },

  {
    path: "/user/",
    element: <UserProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
    ],
  },

  {
    path: "/admin/",
    element: <AdminProtectedRoute />,
    children: [
      {
        element: <Wrapper />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "usermanagement",
            element: <UserManagement />,
          },
        ],
      },
    ],
  },
]);

export default Routes;
