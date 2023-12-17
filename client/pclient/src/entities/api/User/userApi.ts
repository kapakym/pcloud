import useRequest from "../../../shared/hooks/useRequest";

interface LoginRequest {
    email: string,
    password: string
}

const filesApi = {
    loginUser: (params: LoginRequest) => useRequest<{ token: string }, LoginRequest>({
        url: '/api/user/login',
        method: 'post',
        options: {
            isNotRequest: true,
            params
        }
    })
}

export const {
    loginUser: useLoginUser
} = filesApi