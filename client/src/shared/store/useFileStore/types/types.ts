import {IFile} from "../../../types/FIles/fileTypes";

export interface UploadFiles {
    file: string,
    path: string,
    id: string,
    progress: number
    error?: {
        message: string
    },
    isLoading?: boolean
}

export interface DownloadFiles {
    name: string,
    id: string,
    path: string,
    isLoading?: boolean
}

export interface IDownloadFileAction {
    file: IFile;
    path: string;
    uuid: string;
    mode?: string;
    token?: string;
    uuidShare?: string;
    source?: string
}

export interface FilesState {
    files: Array<UploadFiles>,
    isVisible: boolean
    isAllUploaded: boolean
    downloadFiles: DownloadFiles[],
    downloadFileAction: (options: IDownloadFileAction) => Promise<void>
    uploadFileActions: (file: File, path: string, uuid: string) => void,
    removeUploadFile: (uuid: string) => void,
    show: () => void,
    hide: () => void,
    previewFile: {
        src: string,
        type: string
    }
}