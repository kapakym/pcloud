import {create} from 'zustand'
import {immer} from "zustand/middleware/immer";
import {IFile} from "../../types/FIles/fileTypes";
import requiestBuilder from "../requestBuilder";

interface UploadFiles {
    file: string,
    path: string,
    id: string,
    progress: number
    error?: {
        message: string
    },
    isLoading?: boolean
}

interface DownloadFiles {
    name: string,
    id: string,
    path: string,
    isLoading?: boolean
}

interface FilesState {
    files: Array<UploadFiles>,
    isVisible: boolean
    isAllUploaded: boolean
    downloadFiles: DownloadFiles[],
    downloadFileAction: (ile: IFile, path: string, uuid: string) => void
}

export const useFilesStore = create<FilesState>()(immer((set) => ({
    files: [],
    isVisible: false,
    isAllUploaded: true,
    downloadFiles: [],

    downloadFileAction: async (file: IFile, path: string, uuid: string) => {
        set(state => {
            state.downloadFiles.push({
                name: file.name,
                id: uuid,
                path,
                isLoading: true
            })
        })

        try {
            const response = await requiestBuilder<Blob, {
                files: IFile[],
                path: string
            }>({
                url: '/api/files/downloadfile',
                method: 'post',
                responseType: 'blob',
                options: {
                    data: {
                        files: [file],
                        path
                    }
                }
            })()

            if (response instanceof Blob) {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.name);
                document.body.appendChild(link);
                link.click();
                link.remove()
            }

            set(state => {
                state.downloadFiles = state.downloadFiles.filter(item => item.id !== uuid)
            })
        } catch (e) {
            console.log(e)
        }
    }

})))