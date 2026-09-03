import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSeletor } from "../services/helper/redux";
import React, { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  changeStatus,
  deleteUserByAdmin,
  getAllUser,
  getUserById,
  resetPassword,
} from "../store/slices/user.slice";
import { Button, CircularProgress, Dialog, Switch } from "@mui/material";
import { Edit2, Eye, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import UserPagination from "./UserPagination";

interface UserTableInterface{
  setIsEdit: Dispatch<SetStateAction<string | null>>;
  setOpen: (isOpen: boolean)=> void;
  search: string;
  page: number;
  setPage: (page: number)=> void
  limit: number
  setLimit: (limit: number)=> void

}

const UserTable: React.FC<UserTableInterface> = ({ setIsEdit, setOpen, search,  page, setPage, limit, setLimit }) => {
  const {
    userList,
    error,
    loading,
    userById,
    updatingUserId,
    deleteUserId,
    statusUserId,
    totalPages,
    totalUsers,
    currentPage,
   
  } = useAppSeletor((state) => state.user);
  const [openById, setOpenById] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  console.log("userbyid", userById);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllUser({ page: page, limit: limit, name: search }));
    }, 500);
    return ()=> {
      clearTimeout(timer)
    }
  }, [dispatch, userId, page, limit, search]);


  useEffect(()=> {
      dispatch(getUserById({ id: userId }));
  }, [dispatch, userId])

  console.log("userlist", userList);

  const handleDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteUserByAdmin(id)).unwrap();
      if (response.data.status === true) {
        toast.success(response.data.message);
         dispatch(getAllUser({ page: page, limit: limit, name: search }));
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleChangeStatus = async (id: string, status: string) => {
    // console.log(id)
    try {
      const response = await dispatch(changeStatus({ id, status })).unwrap();
      if (response.data.status === true) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleResetPassword = async (id: string) => {
    try {
      const response = await dispatch(resetPassword(id)).unwrap();
      if (response.data.status === true) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <>
      <TableContainer
        style={{
          padding: "10px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#faf5ff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {error.allUser && (
            <p className="text-center text-red-500">{error.allUser}</p>
          )}
          {loading.allUser ? (
            <div className="ml-[500px] p-6">
              <CircularProgress size={40} />
            </div>
          ) : userList.length === 0 ? (
            <p className="text-center text-red-500 p-5">User not found</p>
          ) : (
            <TableBody>
              {userList?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    <span
                      className={`${row.status === "Active" ? "bg-green-700" : "bg-red-700"} p-2 text-white gap-3 rounded-full`}
                    >
                      {row.status}
                    </span>{" "}
                  </TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "15px",
                      paddingLeft: "150px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpen(true);
                        setIsEdit(row._id);
                      }}
                    >
                      <Edit2 />
                    </Button>
                    <Button
                      disabled={deleteUserId === row._id}
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(row._id)}
                    >
                      {deleteUserId === row._id ? (
                        <CircularProgress size={24} />
                      ) : (
                        <Trash2 />
                      )}
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setUserId(row._id);
                        setOpenById(true);
                      }}
                    >
                      <Eye />
                    </Button>

                    <Button
                      disabled={updatingUserId === row._id}
                      onClick={() => handleResetPassword(row._id)}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      <RotateCcw />
                      {updatingUserId === row._id ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Reset"
                      )}
                    </Button>

                    <Switch
                      disabled={statusUserId === row._id}
                      onChange={(e) => {
                        const status = e.target.checked ? "Active" : "InActive";
                        handleChangeStatus(row._id, status);
                      }}
                      checked={row.status === "Active"}
                      color="warning"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <UserPagination
        page={page}
        setLimit={setLimit}
        limit={limit}
        setPage={setPage}
        totalUsers={totalUsers}
        totalPages={totalPages}
        currentPage={currentPage}
      />
      <Dialog
        onClose={() => {
          setUserId(userId);
          setOpenById(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={openById}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          style={{ fontWeight: "bold" }}
          id="customized-dialog-title"
        >
          User Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenById(false);
            setUserId(null);
          }}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers style={{ padding: "20px 20px" }}>
          <Typography gutterBottom>Name: {userById?.name}</Typography>
          <Typography gutterBottom>Email: {userById?.email}</Typography>
          <Typography gutterBottom>Phone No: {userById?.phone}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            autoFocus
            onClick={() => {
              setUserId(null);
              setOpenById(false);
            }}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default UserTable;
