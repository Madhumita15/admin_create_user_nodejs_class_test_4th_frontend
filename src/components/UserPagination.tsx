import { Button } from "@mui/material";

interface UserPaginationInterface{
    limit: number
    setLimit: (limit: number)=> void
    setPage: (page: number )=> void
    page: number
    currentPage: number
    totalPages: number
    totalUsers: number
}

const UserPagination: React.FC<UserPaginationInterface> = ({
  limit,
  setLimit,
  setPage,
  page,
  currentPage,
  totalPages,
  totalUsers,
}) => {
  return (
    <>
      <div className="flex flex-row gap-3 items-center absolute right-8 pt-9">
        <div className="flex flex-row gap-3 items-center ">
          <Button
          disabled={currentPage === 1}
            variant="contained"
            color="error"
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>
          <span className="text-gray-900 font-bold text-xl">
            {currentPage} of {totalPages} data - {totalUsers}
          </span>
          <Button
          disabled={currentPage === totalPages}
            variant="contained"
            color="success"
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
        
        <select
          name="limit"
          value={limit}
          onChange={(e) => {
            setPage(1)
            setLimit(Number(e.target.value))
        }}
          className="px-1 py-2 rounded-md outline-none border-gray-500"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
        </select>
      </div>
    </>
  );
};

export default UserPagination;
