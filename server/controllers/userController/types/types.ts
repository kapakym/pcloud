
export interface IGetUserListRes {
    id: number
    email: string
    approve: boolean
    home_folder: string
}

export interface ResponseRegisterUser {
    message: string
}

export interface ResponseLoginUser {
    token: string
    role: string
    folder: string
}

export interface RequestUser {
    email: string;
    password: string;
}