import React, {useEffect, useState} from 'react';
import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import {useCreateFolder} from "../../../entities/api/filesApi/filesApi";

interface Props {
    isVisible: boolean;
    path?: string;
    onClose?: () => void
    onCreate?: () => void
}

const NewFolderModal = ({isVisible = false, onClose, path, onCreate}: Props) => {
    const [folderName, setFolderName] = useState("")
    const [data, {requestFn}] = useCreateFolder();

    useEffect(() => {
        if (data?.folderName) {
            if (onCreate)  {
                if (onClose) onClose()
                onCreate()
            }
        }
    }, [data]);

    if (!isVisible) return (<></>);

    const handleCreate = () => {
        requestFn({path, folderName})
    }

    return (
        <Modal title={"Добавление папки"}
               height='auto'
               width='40%'
               isVisible
               onClose={onClose}
               buttons={(
                   <>
                       <Button onClick={handleCreate}>Создать</Button>
                       <Button onClick={onClose}>Отмена</Button>
                   </>
               )}
        >
            <Input label='Название'
                   value={folderName}
                   onChange={(e) => setFolderName(e.currentTarget.value)}
            />

        </Modal>
    );
};

export default NewFolderModal;