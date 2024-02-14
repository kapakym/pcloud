import {create} from 'zustand'
import {immer} from "zustand/middleware/immer";
import {IFile} from "../../types/FIles/fileTypes";
import requiestBuilder from "../requestBuilder";
import axios, {AxiosError} from "axios";
import {FilesState} from "./types/types";



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
                state.isAllUploaded = false
            })

            const progressFn = (percentComplete: number) => {
                set(state => {
                    const file = state.files.find(item => item.id === uuid);
                    if (file) {
                        file.progress = percentComplete
                        if (file.progress === 100) file!.isLoading = false;
                        else file!.isLoading = true;
                    }

                })
            }

            const response = await requiestBuilder<FormData, unknown>({
                url: '/api/files/upload',
                method: 'post',
                options: {
                    data: formData
                },
                progressFnUp: progressFn
            })()
            if (response) {
                set(state => {
                    state.isAllUploaded = state.files.every(item => !item.isLoading)
                })
            }
        } catch (error: any | AxiosError) {
            if (axios.isAxiosError(error)) {
                set(state => {
                    const file = state.files.find(item => item.id === uuid);
                    if (file && error.response.data.message) {
                        file.isLoading = false
                        file.progress = 100
                        file!.error = {
                            message: error.response.data.message
                        }
                    }
                })
            }
        }
    },

    downloadFileAction: async (options) => {
        set(state => {
            state.downloadFiles.push({
                name: options.file.name,
                id: options.uuid,
                path: options.path,
                isLoading: true,
                progress:0
            })
        })

        const progressFn = (percentComplete: number) => {
            console.log(percentComplete)
            set(state => {
                const file = state.downloadFiles.find(item => item.name === options.file.name);
                if (file) {
                    file.progress = percentComplete
                    if (file.progress === 100) file!.isLoading = false;
                    else file!.isLoading = true;
                }

            })
        }
        try {
            const response = await requiestBuilder<Blob, {
                files: IFile[],
                path: string,
                token?: string
                uuid?: string
            }>({
                url: options.source === 'share' ? '/api/sharelink/downloadfile' : '/api/files/downloadfile',
                method: 'post',
                responseType: 'blob',
                options: {
                    data: {
                        files: [options.file],
                        path:options.path,
                        token: options.token,
                        uuid: options.uuidShare
                    }
                },
                progressFnDw: progressFn
            })()

            if (response instanceof Blob && options.mode === 'disk') {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', options.file.name);
                document.body.appendChild(link);
                link.click();
                link.remove()
            }

            if (response instanceof Blob && options.mode === 'preview') {
                set(state => {
                        state.previewFile.src = window.URL.createObjectURL(new Blob([response], {type: response.type}))
                        state.previewFile.type = response.type
                    }
                )
            }
            set(state => {
                state.downloadFiles = state.downloadFiles.filter(item => item.id !== options.uuid)
            })
        } catch (e) {
            console.log(e)
        }
    }

})))