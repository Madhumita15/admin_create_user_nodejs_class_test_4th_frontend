import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../services/validation/user.validation";
import DynamicInput from "./DynamicInput";
import { userInput } from "../services/json/inputData/user.input";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSeletor } from "../services/helper/redux";
import { toast } from "sonner";
import {
  createUser,
  getAllUser,
  getProfile,
  updateUserByAdmin,
  updateUserProfile,
} from "../store/slices/user.slice";
import type { UserData } from "../typescript/type/user.type";

interface UserDialogInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEdit: string | null;
  setIsEdit: ((isEdit: string | null) => void) | null;
  mode: string;
  user: {
    name: string;
    email: string;
    role: string;
    status: string;
    phone: string;
  } | null;
  page?: number;
  limit?: number;
  search?: string;
}

const UserDialog: React.FC<UserDialogInterface> = ({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  mode,
  user,
  page,
  limit,
  search,
}) => {
  const { loading, userList } = useAppSeletor((state) => state.user);
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<UserData>({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: {
    email: string;
    name: string;
    phone: string;
  }) => {
    // console.log(data);
    try {
      if (isEdit) {
        if (mode === "admin") {
          const response = await dispatch(
            updateUserByAdmin({ data: data, id: isEdit }),
          ).unwrap();
          console.log(response);
          if (response.data.status === true) {
            toast.success(response.data.message);
            reset({
              name: "",
              email: "",
              phone: "",
            });
            setOpen(false);
            setIsEdit?.(null);
          }
        }
      } else if (mode === "user") {
        // console.log(user);
        const response = await dispatch(updateUserProfile(data)).unwrap();
        if (response.status === true) {
          toast.success(response.message);
          reset({
            name: "",
            email: "",
            phone: "",
          });
          setOpen(false);
          dispatch(getProfile());
        }
      } else {
        const response = await dispatch(createUser(data)).unwrap();
        console.log("response", response);
        if (response.status === true) {
          toast.success(response.message);
          reset({
            name: "",
            email: "",
            phone: "",
          });
          dispatch(getAllUser({ page: page, limit: limit, name: search }));
          setOpen(false);
        }
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  React.useEffect(() => {
    if (!open) return;
    if (isEdit && mode === "admin") {
      const data = userList?.find((user) => user._id === isEdit);
      console.log("data", data);
      reset({
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
      });
    }

    if (mode === "user" && user) {
      console.log("user", user);
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [isEdit, userList, reset, mode, user, open]);
  return (
    <>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={() => {
            setIsEdit?.(null);
            reset({
              name: "",
              email: "",
              phone: "",
            });
            setOpen(false);
          }}
        >
          <DialogTitle
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {isEdit ? "Update user" : "create user"}
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 mb-5"
              id="subscription-form"
            >
              {userInput.map((item) => (
                <DynamicInput
                  required={item.required}
                  errors={errors}
                  loading={loading.create || loading.updateByAdmin}
                  register={register}
                  name={item.name}
                  type={item.type}
                  label={item.label}
                />
              ))}
            </form>
          </DialogContent>

          <DialogActions>
            <Button
              disabled={loading.create || loading.updateByAdmin}
              variant="outlined"
              color="error"
              onClick={() => {
                setIsEdit?.(null);
                reset({
                  name: "",
                  email: "",
                  phone: "",
                });
                setOpen(false);
              }}
            >
              Cancel user
            </Button>
            <Button
              disabled={loading.create || loading.updateByAdmin}
              variant="contained"
              color="success"
              type="submit"
              form="subscription-form"
              style={{ backgroundColor: "#7e22ce" }}
            >
              {loading.create || loading.updateByAdmin ? (
                <CircularProgress size={24} />
              ) : isEdit || mode === "user" ? (
                "Update user"
              ) : (
                "create user"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};
export default UserDialog;
