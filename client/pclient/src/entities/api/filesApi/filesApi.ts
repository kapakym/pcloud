import useRequest from "../../../shared/hooks/useRequest";
import {ResponseGetFiles} from "./types/filesTypes";
import {IFile} from "../../../shared/types/FIles/fileTypes";

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
    }),
    DeleteFiles: (data?: { files: IFile[], path: string }) => useRequest<{
        deleteFiles: IFile[]
    }, Partial<{
        files: IFile[],
        path: string
    }>>({
        url: '/api/files/deletefile',
        method: 'post',
        options: {
            data,
            isNotRequest: true,
            headers: {
                homeFolder: localStorage.getItem('folder') || 'error'
            }
        }
    }),
    DownloadFiles: (data?: { files: IFile[], path: string }) => useRequest<Blob, {
        files: IFile[],
        path: string
    }>({
        url: '/api/files/downloadfile',
        method: 'post',
        responseType: 'blob',
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
    DeleteFiles: useDeleteFiles,
    DownloadFiles: useDownloadFiles,
} = filesApi