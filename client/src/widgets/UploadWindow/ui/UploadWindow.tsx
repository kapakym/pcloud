import React from 'react';
import ModalRightDown from "../../../shared/ui/ModalRightDown/ui/ModalRightDown";
import FileUploadItem from "../../../shared/ui/FileUploadItem";
import {useFilesStore} from "../../../shared/store/zustand/useFilesStore";

const UploadWindow = () => {
    // const { isVisible} = useAppSelector(state => state.filesReducer)
    const removeUploadFile = useFilesStore(state => state.removeUploadFile)
    const files = useFilesStore(state => state.files)
    const isVisible = useFilesStore(state => state.isVisible)
    const hide = useFilesStore(state => state.hide)
    const handleClose = () => {
        hide()
    }
    const handleRemoveItem = (uuid?: string) => {
        if (uuid) {
            removeUploadFile(uuid)
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