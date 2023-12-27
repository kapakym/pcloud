import useRequest from "../../../shared/hooks/useRequest";
import {ResponseGetFiles} from "./types/filesTypes";

const filesApi = {
    GetFilesFromPath: (data: { path: string }) => useRequest<ResponseGetFiles, { path: string }>({
        url: '/api/files',
        method: 'post',
        options: {
            data,
            headers: {
                homeFolder: localStorage.getItem('folder') || 'error'
            }
        }
    }),

    UploadFile: (data?: FormData) => useRequest<{ filename: string }, Partial<FormData>>({
        url: '/api/files/upload',
        method: 'post',
        options: {
            data,
            isNotRequest: true,
            headers: {
                homeFolder: localStorage.getItem('folder') || 'error'
            }
        }
    }),

    CreateFolder: (data?: { path: string, folderName: string }) => useRequest<{ folderName: string }, Partial<{
        path: string,
        folderName: string
    }>>({
        url: '/api/files/createfolder',
        method: 'post',
        options: {
            data,
            isNotRequest: true,
            headers: {
                homeFolder: localStorage.getItem('folder') || 'error'
            }
        }
    })
}

export const {
    GetFilesFromPath: useGetFilesFromPath,
    UploadFile: useUploadFile,
    CreateFolder: useCreateFolder,
} = filesApi