import makeRequest from "../hooks/useRequest";

const filesApi = {
    getFilesFromPath: () => makeRequest<string[], unknown>({url: '/api/folders', method: 'post'})
}

export const {
    getFilesFromPath: useGetFilesFromPath
} = filesApi