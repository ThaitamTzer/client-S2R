export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  account: string;
  password: string;
  rememberMe?: boolean;
};

// export type UserDataType = {
//   id: number
//   role: string
//   email: string
//   fullName: string
//   username: string
//   password: string
//   avatar?: string | null
// }

export type UserDataType = {
  typeUser: null;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  isBlock: boolean;
  userStyle: null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserDataType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserDataType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
};
