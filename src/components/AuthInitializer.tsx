import { useEffect, type ReactNode } from "react";
import { useAppDispatch, useAppSeletor } from "../services/helper/redux";
import { getProfile } from "../store/slices/user.slice";
import { CircularProgress } from "@mui/material";

const AuthInitializer = ({ children }: {children: ReactNode}) => {
  const dispatch = useAppDispatch();

  const { profileFetched, loading } = useAppSeletor(
    (state) => state.user
  );

  useEffect(() => {
    if (!profileFetched) {
      dispatch(getProfile());
    }
  }, [dispatch, profileFetched]);

  if (!profileFetched || loading.profile) {
    return <div className="flex items-center justify-center min-h-screen"><CircularProgress size={40}  /></div>;
  }

  return children;
};

export default AuthInitializer;