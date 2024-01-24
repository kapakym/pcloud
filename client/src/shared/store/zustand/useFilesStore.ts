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
    downloadFileAction: (file: IFile, path: string, uuid: string, mode?: string) => Promise<void>
    uploadFileActions: (file: File, path: string, uuid: string) => void,
    removeUploadFile: (uuid: string) => void,
    show: () => void,
    hide: () => void,
    previewFile: {
        src: string,
        type: string
    }
}

export const useFilesStore = create<FilesState>()(immer((set) => ({
    files: [],
    isVisible: false,
    isAllUploaded: true,
    downloadFiles: [],
    previewFile: {
        src: '',
        type: ''
    },

    show: () => set(state => {
        state.isVisible = true;
    }),

    hide: () => set(state => {
        state.isVisible = false;
    }),

    removeUploadFile: (uuid: string) => set(state => {
        state.files = state.files.filter(item => item.id !== uuid)
    }),

    uploadFileActions: async (file: File, path: string, uuid: string) => {
        try {
            const formData = new FormData()
            formData.append('file', file);
            formData.append('filename', encodeURI(file.name))
            if (path) {
                formData.append('path', path);
            }

            set(state => {
                state.files.push({
                    file: file.name,
                    id: uuid,
                    path,
                    progress: 0
                })
            })

            const progressFn = (percentComplete: number) => {
                set(state => {
                    const file = state.files.find(item => item.id === uuid);
                    if (file) {
                        file.progress = percentComplete
                        if (file.progress === 100) file!.isLoading = false;
                        else file!.isLoading = true;
                    }
                    state.isAllUploaded = state.files.every(item => !item.isLoading)
                })
            }

            const response = await requiestBuilder<FormData, unknown>({
                url: '/api/files/upload',
                method: 'post',
                options: {
                    data: formData
                },
                progressFn
            })()


        } catch (e) {

        }
    },

    downloadFileAction: async (file: IFile, path: string, uuid: string, mode: string = 'disk') => {
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

            if (response instanceof Blob && mode === 'disk') {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.name);
                document.body.appendChild(link);
                link.click();
                link.remove()
            }

            if (response instanceof Blob && mode === 'preview') {
                set(state => {
                        console.log(response)
                        state.previewFile.src = window.URL.createObjectURL(new Blob([response], {type: response.type}))
                        state.previewFile.type = response.type
                    }
                )

            }

            set(state => {
                state.downloadFiles = state.downloadFiles.filter(item => item.id !== uuid)
            })
        } catch (e) {
            console.log(e)
        }
    }

})))