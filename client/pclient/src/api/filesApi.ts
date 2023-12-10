import makeRequest from "../hooks/useRequest";

interface ResponseGetFiles {
    path: string,
    folders: string[]
    files: string[]
}

const filesApi = {
    getFilesFromPath: (params: { path: string }) => makeRequest<ResponseGetFiles, { path: string }>({
        url: '/api/files',
        method: 'post',
        options: {
            params
        }
    })
}

export const {
    getFilesFromPath: useGetFilesFromPath
} = filesApi