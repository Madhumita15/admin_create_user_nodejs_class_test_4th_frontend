import {  useAppSeletor } from "../../services/helper/redux";

const Navbar = () => {
  const { isAuthinticated, user } = useAppSeletor(
    (state) => state.user,
  );

  
  return (
    <>
      {isAuthinticated && user && (
        <h1 className="font-bold text-xl font-mono ">
          Welcome {user?.name} to your dashboard
        </h1>
      )}
    </>
  );
};

export default Navbar;
