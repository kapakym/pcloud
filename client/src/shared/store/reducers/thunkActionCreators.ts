// export const makeFetchRequest = () => ()
import {AppDispatch} from "../store";
import axios, {AxiosError} from "axios";
import {uploadFilesSlice} from "./FilesSlice";
import {IFile} from "../../types/FIles/fileTypes";
import requiestBuilder from "../requestBuilder";

export const uploadFile = (file: File, path: string, uuid: string) => (dispatch: AppDispatch) => {
    const {addUploadFiles, setError, removeUploadFile, changeProgress} = uploadFilesSlice.actions
    try {
        const formData = new FormData()
        formData.append('file', file);
        formData.append('filename', encodeURI(file.name))
        if (path) {
            formData.append('path', path);
        }

        dispatch(addUploadFiles([{
            file: file.name,
            id: uuid,
            path,
            progress: 0
        }]))

        axios({
            method: 'post',
            url: '/api/files/upload',
            data: formData,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                homeFolder: localStorage.getItem('folder') || 'error'
            },
            onUploadProgress: (progressEvent: any) => {
                let percentComplete: number = progressEvent.loaded / progressEvent.total
                percentComplete = percentComplete * 100;
                dispatch(changeProgress({id: uuid, value: percentComplete}))
            }
        }).then(response => {
            // setData(response.data)
        }).catch((error: Error | AxiosError) => {
            if (axios.isAxiosError(error)) {
                console.log(error)
                // setIsError(true)
                // setErrorRes(error);
                if (error?.response?.status === 400) {
                    if (error?.response?.data?.message) {
                        dispatch(setError({message: error?.response?.data?.message, uuid}))
                    }
                }
                if (error?.response?.status === 401) {
                    // navigate({
                    //     pathname: '/login'
                    // })
                }
            }
            // throw  new Error(error as any)
        }).finally(() => {
            // setIsLoading(false)
        });
    } catch (e) {

    }
}

export const downloadFileAction = (file: IFile, path: string, uuid: string) => async (dispatch: AppDispatch) => {
    const {addDownloadFile, removeDownloadFile, setError, removeUploadFile, changeProgress} = uploadFilesSlice.actions
    dispatch(addDownloadFile([{
        name: file.name,
        id: uuid,
        path,
        isLoading: true
    }]))

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

        dispatch(removeDownloadFile(uuid))
    } catch (e) {
        console.log(e)
    }

}

