import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../services/helper/global.helper";
import { axiosInstance } from "../../lib/axiosInstance";
import { ENDPOINT } from "../../services/helper/endPoint";
import type {
  LoginDataType,
  UserData,
  UserInitialState,
} from "../../typescript/type/user.type";

const initialState: UserInitialState = {
  loading: {
    login: false,
    profile: false,
    create: false,
    allUser: false,
    logout: false,
    userById: false,
    updateByAdmin: false,
    password: false,
    updateProfile: false,
    stats: false,
  },
  error: {
    login: null,
    profile: null,
    create: null,
    allUser: null,
    logout: null,
    userById: null,
    updateByAdmin: null,
    deleteUser: null,
    password: null,
    status: null,
    reset: null,
    updateProfile: null,
    stats: null,
  },
  userList: [],
  userById: null,
  isAuthinticated: false,
  user: null,
  role: null,
  profileFetched: false,
  updatingUserId: null,
  deleteUserId: null,
  statusUserId: null,
  currentPage: 0,
  totalPages: 0,
  totalUsers: 0,
  totalStatsUsers: 0,
  totalActiveUsers: 0,
  totalInActiveUsers: 0,
};

export const login = createAsyncThunk(
  "user/login",
  async (
    data:  LoginDataType,
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(ENDPOINT.login, data);
      console.log("response from login", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createUser = createAsyncThunk(
  "user/create",
  async (
    data: { name: string; email: string; phone: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(ENDPOINT.admin.create, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getAllUser = createAsyncThunk(
  "user/getalluser",
  async (
    { page, limit, name }: { page: number; limit: number; name: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(ENDPOINT.admin.allUser, {
        params: { page, limit, name },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINT.logout);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getUserById = createAsyncThunk(
  "user/byId",
  async ({ id }: { id: string | null }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${ENDPOINT.admin.allUser}/${id}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateUserByAdmin = createAsyncThunk(
  "user/updateByAdmin",
  async ({ data, id }: { data: UserData; id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `${ENDPOINT.admin.allUser}/${id}/update`,
        data,
      );
      return {
        id: id,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteUserByAdmin = createAsyncThunk(
  "user/deleteByAdmin",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `${ENDPOINT.admin.allUser}/${id}/delete`,
      );
      return {
        id: id,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updatePassword = createAsyncThunk(
  "user/update/password",
  async (
    { curPassword, newPassword }: { curPassword: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(
        `${ENDPOINT.user.updatePassword}`,
        { curPassword, newPassword },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(ENDPOINT.user.getProfile);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const changeStatus = createAsyncThunk(
  "user/change/status",
  async (
    { id, status }: { id: string; status: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.patch(
        `${ENDPOINT.admin.allUser}/${id}/status`,
        { status: status },
      );
      return {
        id: id,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const resetPassword = createAsyncThunk(
  "user/password/reset",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `${ENDPOINT.admin.allUser}/${id}/reset-password`,
      );
      return {
        id: id,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "user/profile/update",
  async (data: UserData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `${ENDPOINT.user.updateProfile}`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getUserStats = createAsyncThunk(
  "user/stats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${ENDPOINT.admin.getStats}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const userSlice = createSlice({
  name: "user/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading.login = true;
        state.error.login = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading.login = false;
        state.error.login = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login =
          (action.payload as string) || "something went wrong";
      })
      .addCase(getProfile.pending, (state) => {
        state.loading.profile = true;
        state.error.profile = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading.profile = false;
        state.error.profile = null;
        console.log("action", action.payload);
        state.isAuthinticated = true;
        state.role = action.payload.data.role;
        state.user = action.payload.data;
        state.profileFetched = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading.profile = false;
        state.profileFetched = true;
        state.isAuthinticated = false;
        state.role = null;
        state.user = null;
        state.error.profile =
          (action.payload as string) || "something went wrong";
      })
      .addCase(createUser.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading.create = false;
        state.error.create = null;
        console.log("action", action.payload);
        state.userList.unshift(action.payload.data);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create =
          (action.payload as string) || "something went wrong";
      })
      .addCase(getAllUser.pending, (state) => {
        state.loading.allUser = true;
        state.error.allUser = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading.allUser = false;
        state.error.allUser = null;
        console.log("action", action.payload);
        state.userList = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalUsers = action.payload.totalUsers;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading.allUser = false;
        state.error.allUser =
          (action.payload as string) || "something went wrong";
      })
      .addCase(getUserStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.error.stats = null;
        console.log("action from stats", action.payload);
        state.totalStatsUsers = action.payload.totalUsers;
        state.totalActiveUsers = action.payload.totalActiveUsers;
        state.totalInActiveUsers = action.payload.totalInActiveUsers;
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats =
          (action.payload as string) || "something went wrong";
      })
      .addCase(logout.pending, (state) => {
        state.loading.logout = true;
        state.error.logout = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading.logout = false;
        state.error.logout = null;
        state.isAuthinticated = false;
        state.role = null;
        state.user = null;
        state.profileFetched = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading.logout = false;
        state.error.logout =
          (action.payload as string) || "something went wrong";
      })
      .addCase(getUserById.pending, (state) => {
        state.loading.userById = true;
        state.error.userById = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading.userById = false;
        state.error.userById = null;
        state.userById = action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading.userById = false;
        state.error.userById =
          (action.payload as string) || "something went wrong";
      })
      .addCase(updateUserByAdmin.pending, (state) => {
        state.loading.updateByAdmin = true;
        state.error.updateByAdmin = null;
      })
      .addCase(updateUserByAdmin.fulfilled, (state, action) => {
        state.loading.updateByAdmin = false;
        state.error.updateByAdmin = null;
        state.userList = state.userList.map((user) =>
          user._id === action.payload.id ? action.payload.data.data : user,
        );
      })
      .addCase(updateUserByAdmin.rejected, (state, action) => {
        state.loading.updateByAdmin = false;
        state.error.updateByAdmin =
          (action.payload as string) || "something went wrong";
      })
      .addCase(deleteUserByAdmin.pending, (state, action) => {
        state.error.deleteUser = null;
        state.deleteUserId = action.meta.arg;
      })
      .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
        state.error.deleteUser = null;
        state.deleteUserId = null;
        state.userList = state.userList.filter(
          (user) => user._id !== action.payload.id,
        );
      })
      .addCase(deleteUserByAdmin.rejected, (state, action) => {
        state.deleteUserId = null;
        state.error.deleteUser =
          (action.payload as string) || "something went wrong";
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading.password = true;
        state.error.password = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading.password = false;
        state.error.password = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading.password = false;
        state.error.password =
          (action.payload as string) || "something went wrong";
      })
      .addCase(changeStatus.pending, (state, action) => {
        state.error.status = null;
        state.statusUserId = action.meta.arg.id;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.error.status = null;
        state.statusUserId = null;
        state.userList = state.userList.map((user) =>
          user._id === action.payload.id ? action.payload.data.data : user,
        );
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.statusUserId = null;
        state.error.status =
          (action.payload as string) || "something went wrong";
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.error.reset = null;
        console.log("id", action.meta.arg);
        state.updatingUserId = action.meta.arg;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.error.reset = null;
        state.updatingUserId = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.updatingUserId = null;
        state.error.reset =
          (action.payload as string) || "something went wrong";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading.updateProfile = true;
        state.error.updateProfile = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading.updateProfile = false;
        state.error.updateProfile = null;
        state.user = action.payload.data.data;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading.updateProfile = false;
        state.error.updateProfile =
          (action.payload as string) || "something went wrong";
      });
  },
});

export default userSlice.reducer;
