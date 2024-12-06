export interface IUser {
    userInfo: IUserInfo;
    accessToken: string;
}

export interface ICredentials {
    accessToken: string;
    refreshToken: string;
}

export interface IUserInfo {
    user_id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    created: string;
    is_active: boolean;
}
