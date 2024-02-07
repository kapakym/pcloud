import useRequest from "../../../shared/hooks/useRequest";
import {IGetUsersRes} from "./types/types";

interface LoginRequest {
    email: string,
    password: string
}

type RegisterRequest = Partial<LoginRequest>

const filesApi = {
    LoginUser: (data: LoginRequest) => useRequest<{ token: string, role: string, folder: string }, LoginRequest>({
        url: '/api/user/login',
        method: 'post',
        options: {
            isNotRequest: true,
            data
        }
    }),
    RegistrationUser: (data: RegisterRequest) => useRequest<{ message: string }, RegisterRequest>({
        url: '/api/user/registration',
        method: 'post',
        options: {
            isNotRequest: true,
            data
        }
    }),
    GetUsers: () => useRequest<IGetUsersRes[], unknown>({
        url:'/api/user/getusers',
        method: 'get',
    })
}

export const {
    LoginUser: useLoginUser,
    RegistrationUser: useRegistrationUser,
    GetUsers: useGetUsers
} = filesApi