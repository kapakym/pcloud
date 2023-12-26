import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

interface FilesState {
    files: Array<UploadFiles>,
    isVisible: boolean
}

const initialState: FilesState = {
    files: [],
    isVisible: false,
}

export const uploadFilesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        show(state) {
            state.isVisible = true;
        },
        hide(state) {
            state.isVisible = false
        },
        setError(state, action: PayloadAction<{ message: string, uuid: string }>) {
            const file = state.files.find(item => item.id === action.payload.uuid)
            if (file) {
                file!.isLoading = false;
                file!.error = {
                    message: action.payload.message
                }
            }
        },
        addUploadFiles(state, action: PayloadAction<UploadFiles[]>) {
            state.files.push(...action.payload)
            state.isVisible = true;
        },
        removeUploadFile(state, action: PayloadAction<string>) {
            state.files = state.files.filter(item => item.id !== action.payload)
        },
        changeProgress(state, action: PayloadAction<{ id: string, value: number }>) {
            const file = state.files.find(item => item.id === action.payload.id);
            if (file) {
                file.progress = action.payload.value
                if (file.progress === 100) file!.isLoading = false;
                else file!.isLoading = true;
            }
        }

    }
})

export default uploadFilesSlice.reducer;