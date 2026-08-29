import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  Pencil,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import UserDialog from "../../components/UserDialog";
import { useState } from "react";
import { Button } from "@mui/material";
import { logout } from "../../store/slices/user.slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useAppSeletor((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await dispatch(logout()).unwrap();
      console.log(response);
      if (response.status === true) {
        toast.success(response.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-purple-50 px-4 py-10 text-slate-800">
        {/* Header */}
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-3">
            {/* Icon */}
            <div className="rounded-xl bg-violet-100 p-3 ring-1 ring-violet-200 shadow-sm">
              <Sparkles className="h-6 w-6 text-violet-600" />
            </div>

            {/* Heading */}
            <div>
              <h1 className="bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent">
                Welcome {user?.name} to your Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your profile and account information
              </p>
            </div>

            <Button
              style={{ marginLeft: "200px" }}
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.20)",
              }}
            >
              Logout
            </Button>
          </div>

          {/* Profile Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-violet-500 bg-white/80 p-6 shadow-xl shadow-violet-100/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-600 hover:shadow-2xl hover:shadow-violet-100">
            
            {/* Background glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-200/50 blur-3xl transition-all duration-500 group-hover:bg-violet-300/50" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              {/* User */}
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-2xl font-bold text-white shadow-lg shadow-violet-200">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    {user?.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Your account information
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => {
                  setOpen(true);
                }}
                className="group/edit inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-purple-500 hover:shadow-xl hover:shadow-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-50 active:scale-95"
              >
                <Pencil className="h-4 w-4 transition-transform duration-300 group-hover/edit:rotate-[-8deg]" />

                Edit Profile

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/edit:translate-x-1" />
              </button>

              <UserDialog
                mode="user"
                isEdit={null}
                setIsEdit={null}
                user={user}
                open={open}
                setOpen={setOpen}
              />
            </div>

            {/* User Information */}
            <div className="relative mt-8 grid gap-4 sm:grid-cols-2">

              {/* Name */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:border-violet-500 hover:bg-violet-50 hover:shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <User className="h-4 w-4 text-violet-600" />

                  <span className="text-xs font-medium uppercase tracking-wider">
                    Full Name
                  </span>
                </div>

                <p className="font-medium text-slate-800">
                  {user?.name}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:border-violet-500 hover:bg-violet-50 hover:shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <Mail className="h-4 w-4 text-violet-600" />

                  <span className="text-xs font-medium uppercase tracking-wider">
                    Email
                  </span>
                </div>

                <p className="break-all font-medium text-slate-800">
                  {user?.email}
                </p>
              </div>

              {/* Role */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:border-violet-500 hover:bg-violet-50 hover:shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-violet-600" />

                  <span className="text-xs font-medium uppercase tracking-wider">
                    Role
                  </span>
                </div>

                <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium capitalize text-violet-700">
                  {user?.role}
                </span>
              </div>

              {/* Account */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:border-violet-500 hover:bg-violet-50 hover:shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <CalendarDays className="h-4 w-4 text-violet-600" />

                  <span className="text-xs font-medium uppercase tracking-wider">
                    Account
                  </span>
                </div>

                <p className="font-medium text-emerald-600">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;