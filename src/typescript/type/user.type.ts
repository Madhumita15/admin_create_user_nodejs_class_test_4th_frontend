import type { Path } from "react-hook-form";

export type UserData = {
  name: string;
  email: string;
  phone: string;
};

export type LoginDataType= {
    email: string
    password: string
}

export type UserType = {
  name: string;
  email: string;
  _id: string;
  role: string;
  phone: string;
  status: string
} | null;

export type UserListType = {
  createdAt: string;
  createdBy: string;
  email: string;
  isFirstLogin: boolean;
  name: string;
  password: string;
  phone: string;
  role: string;
  status: string;
  updatedAt: string;
  _id: string
};

export type UserInitialState = {
  loading: {
    login: boolean;
    profile: boolean;
    create: boolean;
    allUser: boolean;
    logout: boolean;
    userById: boolean;
    updateByAdmin: boolean;
    password: boolean;
    updateProfile: boolean;
    stats: boolean;
  };
  error: {
    login: string | null;
    profile: string | null;
    create: string | null;
    allUser: string | null;
    logout: string | null;
    userById: string | null;
    updateByAdmin: string | null;
    deleteUser: string | null;
    password: string | null;
    status: string | null;
    reset: string | null;
    updateProfile: string | null;
    stats: string | null;
  };
  userList: UserListType[];
  userById: UserListType | null;
  isAuthinticated: boolean;
  user: UserType;
  role: string | null;
  profileFetched: boolean;
  updatingUserId: string | null;
  deleteUserId: string | null;
  statusUserId: string | null;
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  totalStatsUsers: number;
  totalActiveUsers: number;
  totalInActiveUsers: number;
};

export type PasswordDataType = {
  curPassword: string;
  newPassword: string;
  confirmPassword: string;
};



export type InputType<T> = {
  label: string
  required: boolean
  name: Path<T>
  type: "text" | "email" | "password" | "number" | "textarea"
}
