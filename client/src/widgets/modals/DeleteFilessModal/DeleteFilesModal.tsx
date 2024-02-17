import React, {useEffect} from 'react';
import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import {useDeleteFiles} from "../../../entities/api/filesApi/filesApi";
import {FileTypes, IFile} from "../../../shared/types/FIles/fileTypes";

interface Props {
    isVisible: boolean;
    path?: string;
    onClose?: () => void
    files: IFile[]
}

const DeleteFilesModal = ({isVisible = false, onClose, path, files}: Props) => {
    const [data, {requestFn}] = useDeleteFiles();

    useEffect(() => {
        if (data?.deleteFiles.length) {
            if (onClose) onClose()
        }
    }, [data]);

    if (!isVisible) return (<></>);

    const handleDelete = () => {
        requestFn({path, files})
    }

    return (
        <Modal title={`Удаление файл${files.length > 1 ? 'ов' : 'а'}`}
               height='auto'
               width='min-w-[40%]'
               isVisible
               onClose={onClose}
               buttons={(
                   <>
                       <Button onClick={handleDelete}>Удалить</Button>
                       <Button onClick={onClose}>Отмена</Button>
                   </>
               )}
        >
            <div className='flex flex-col'>
                {!!files.length &&
                    files.map(item => (<text>
                        {item.name} - {FileTypes[item.type]}
                    </text>))
                }
            </div>


        </Modal>
    );
};

export default DeleteFilesModal;