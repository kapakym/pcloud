import useRequest from "../../../shared/hooks/useRequest";

interface LoginRequest {
    email: string,
    password: string
}

type RegisterRequest = Partial<LoginRequest>

const filesApi = {
    LoginUser: (params: LoginRequest) => useRequest<{ token: string, role: string, folder: string }, LoginRequest>({
        url: '/api/user/login',
        method: 'post',
        options: {
            isNotRequest: true,
            params
        }
    }),
    RegistrationUser: (params: RegisterRequest) => useRequest<{ message: string }, RegisterRequest>({
        url: '/api/user/registration',
        method: 'post',
        options: {
            isNotRequest: true,
            params
        }
    })
}

export const {
    LoginUser: useLoginUser,
    RegistrationUser: useRegistrationUser
} = filesApi