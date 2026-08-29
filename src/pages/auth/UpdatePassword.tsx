import { useForm } from "react-hook-form";
import DynamicInput from "../../components/DynamicInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordInput } from "../../services/json/inputData/password.input";
import { CircularProgress } from "@mui/material";
import { PasswordSchema } from "../../services/validation/password.validation";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { toast } from "sonner";
import { updatePassword } from "../../store/slices/user.slice";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import type { PasswordDataType } from "../../typescript/type/user.type";




const UpdatePassword = () => {
  const { loading } = useAppSeletor((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  

  const {
    formState: { errors },
    handleSubmit,
    reset,
    register,
  } = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues: {
      newPassword: "",
      curPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordDataType) => {
    console.log(data);

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password is not matching");
      return;
    }

    try {
      const response = await dispatch(
        updatePassword({newPassword: data.newPassword, curPassword: data.curPassword}),
      ).unwrap();

      if (response.status === true) {
        toast.success(response.message);
        reset();
        navigate("/user/dashboard");
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/50 to-purple-50 px-4">

        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-200/50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-200/50 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-100/40 blur-3xl" />

        {/* Password Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 flex w-full max-w-md flex-col gap-4 rounded-2xl border border-violet-100 bg-white/85 p-8 shadow-2xl shadow-violet-100/70 backdrop-blur-xl sm:p-10"
        >

          {/* Icon */}
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-200">
            <LockKeyhole className="h-7 w-7 text-white" />
          </div>

          {/* Heading */}
          <div className="mb-4 text-center">
            <h3 className="bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Password Update
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create a new secure password for your account
            </p>
          </div>

          {/* Inputs */}
          {PasswordInput.map((input) => (
            <DynamicInput
              label={input.label}
              type={input.type}
              required={input.required}
              errors={errors}
              register={register}
              name={input.name}
              loading={loading.password}
            />
          ))}

          {/* Update Button */}
          <button
            disabled={loading.password}
            type="submit"
            className="mt-3 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-3 font-bold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 hover:shadow-xl hover:shadow-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading.password ? (
              <CircularProgress
                size={24}
                sx={{ color: "#ffffff" }}
              />
            ) : (
              "Update Password"
            )}
          </button>

          {/* Security Information */}
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-violet-500" />
            Keep your password secure and don't share it with anyone
          </div>

        </form>
      </div>
    </>
  );
};

export default UpdatePassword;