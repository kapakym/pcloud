import useRequest from "../../../shared/hooks/useRequest";

interface LoginRequest {
    email: string,
    password: string
}

const filesApi = {
    LoginUser: (params: LoginRequest) => useRequest<{ token: string, role: string }, LoginRequest>({
        url: '/api/user/login',
        method: 'post',
        options: {
            isNotRequest: true,
            params
        }
    })
}

export const {
    LoginUser: useLoginUser
} = filesApi