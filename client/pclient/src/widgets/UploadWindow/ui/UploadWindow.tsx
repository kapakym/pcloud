import React from 'react';
import ModalRightDown from "../../../shared/ui/ModalRightDown/ui/ModalRightDown";
import {useAppDispatch, useAppSelector} from "../../../shared/store/redux";
import FileUploadItem from "../../../shared/ui/FileUploadItem";
import {uploadFilesSlice} from "../../../shared/store/reducers/FilesSlice";

const UploadWindow = () => {
    const {files, isVisible} = useAppSelector(state => state.filesReducer)
    const dispatch = useAppDispatch();
    const {hide, removeUploadFile} = uploadFilesSlice.actions

    const handleClose = () => {
        dispatch(hide())
    }
    const handleRemoveItem = (uuid?: string) => {
        if (uuid) {
            dispatch(removeUploadFile(uuid))
        }
    }
    return (
        <>
            {isVisible &&
                <ModalRightDown title={'Загружаемые файлы...'} onClose={handleClose}>
                    {!!files.length &&
                        files.map(item => (
                            <FileUploadItem title={item.file}
                                            progress={item.progress}
                                            id={item.id}
                                            key={item.id}
                                            error={item?.error?.message}
                                            onClose={handleRemoveItem}
                            />
                        ))
                    }
                </ModalRightDown>
            }
        </>
    );
};

export default UploadWindow;