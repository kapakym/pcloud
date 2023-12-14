import {ResponseGetFiles} from "../../../entities/api/filesApi/types/filesTypes";
import {createSlice} from "@reduxjs/toolkit";


interface FilesState {
    files: ResponseGetFiles
    isLoading: boolean,
    isError: boolean;
}

const initialState: FilesState = {
    files: {
        files: [],
        folders: [],
        path: ''
    },
    isError: false,
    isLoading: false
}

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {}
})

export default filesSlice.reducer;