import { Button } from "@mui/material";
import UserDialog from "../../components/UserDialog";
import React, { useState } from "react";
import UserTable from "../../components/UserTable";


const UserManagement = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
   const [page, setPage] = useState<number>(1);
 

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold ">All Users</h2>
          <div className="flex gap-2">
            <input
            onChange={(e)=> {
              setPage(1)
              setSearch(e.target.value)}}
              type="search"
              placeholder="Search by user name here..."
              className="border border-gray-900 outline-none rounded-md p-2 px-6"
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpen(true)}
            >
              Create User
            </Button>
          </div>
        </div>
      </div>
      <UserDialog
        user={null}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        open={open}
        setOpen={setOpen}
        mode="admin"
      />
      <UserTable setIsEdit={setIsEdit} setOpen={setOpen} search={search} page={page} setPage={setPage}/>
      
    </>
  );
};
export default UserManagement;
