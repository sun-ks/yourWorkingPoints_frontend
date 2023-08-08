export interface IUser {
  userInfo: IUserInfo;
  tokens: ICredentials
}

export interface ICredentials {
  accessToken: string;
  refreshToken: string;
};

export interface IUserInfo {
  user_id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  created: string,
}