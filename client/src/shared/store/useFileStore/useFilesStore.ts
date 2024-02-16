import {create} from 'zustand'
import {immer} from "zustand/middleware/immer";
import {IFile} from "../../types/FIles/fileTypes";
import requiestBuilder from "../requestBuilder";
import axios, {AxiosError} from "axios";
import {FilesState} from "./types/types";
import {useNotifications} from "../useNotifications/useNotifications";
import {NoticeType} from "../useNotifications/types/types";


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
            console.log(response)
            if (response) {
                set(state => {
                    state.isAllUploaded = state.files.every(item => !item.isLoading)
                })
            }
        } catch (error: any | AxiosError) {
            console.log(error)
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
        const pushNotification = useNotifications.getState().pushNotification
        set(state => {
            state.downloadFiles.push({
                name: options.file.name,
                id: options.uuid,
                path: options.path,
                isLoading: true,
                progress: 0
            })
        })

        const progressFn = (percentComplete: number) => {
            console.log(percentComplete)
            set(state => {
                const file = state.downloadFiles.find(item => item.name === options.file.name);
                if (file) {
                    file.progress = percentComplete
                    if (file.progress === 100) {
                        file!.isLoading = false;
                    } else file!.isLoading = true;
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
                        path: options.path,
                        token: options.token,
                        uuid: options.uuidShare
                    }
                },
                progressFnDw: progressFn
            })()
            if (response.data instanceof Blob && options.mode === 'disk') {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', options.file.name);
                document.body.appendChild(link);
                link.click();
                link.remove()
            }
            if (response.data instanceof Blob && options.mode === 'preview') {
                set(state => {
                        state.previewFile.src = window.URL.createObjectURL(new Blob([response.data], {type: response?.data?.type}))
                        state.previewFile.type = response?.data?.type
                    }
                )
            }
            set(state => {
                state.downloadFiles = state.downloadFiles.filter(item => item.id !== options.uuid)
            })
            if (response && 'message' in response.data) {
                pushNotification({message: response?.data?.message as string, type: NoticeType.DANGER})
            }
        } catch (e: any) {
            console.log(e)
            if (e && 'message' in e.response.data) {
                pushNotification({message: e.response.data.message, type: NoticeType.DANGER})
            }
            set(state => {
                state.downloadFiles = state.downloadFiles.filter(item => item.id !== options.uuid)
            })
        }
    }

})))