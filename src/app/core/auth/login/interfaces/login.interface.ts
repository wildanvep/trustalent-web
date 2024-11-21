export interface Login {
    username: string;
    password: string;
}

export interface UserInfo {
    username: string;
    email: string;
    name: string;
    roles: string[];
}

export interface LoginData {
    token: string;
    user_info: UserInfo;
}

