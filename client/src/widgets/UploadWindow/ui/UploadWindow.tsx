import React from 'react';
import ModalRightDown from "../../../shared/ui/ModalRightDown/ui/ModalRightDown";
import FileUploadItem from "../../../shared/ui/FileUploadItem";
import {useFilesStore} from "../../../shared/store/useFileStore/useFilesStore";
import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";

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
                <Modal
                    title={'Загружаемые файлы...'}
                    onClose={handleClose}
                    isVisible={isVisible}
                    height={'h-auto'}
                    width={'w-[90%]'}
                    buttons={(
                        <>
                            <Button onClick={handleClose}>Закрыть</Button>
                        </>
                    )}
                >
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
                </Modal>
            }
        </>
    );
};

export default UploadWindow;