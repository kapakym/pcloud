import useRequest from "../../../shared/hooks/useRequest";
import {ResponseGetFiles} from "./types/filesTypes";

const filesApi = {
    getFilesFromPath: (params: { path: string }) => useRequest<ResponseGetFiles, { path: string }>({
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