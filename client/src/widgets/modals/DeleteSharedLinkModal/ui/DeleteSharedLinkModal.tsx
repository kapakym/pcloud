import React from 'react';
import {useDeleteSharedLink} from "../../../../entities/api/sharelinkApi/sharelinkApi";
import Modal from "../../../../shared/ui/Modal";
import Button from "../../../../shared/ui/Button";

interface Props {
    isVisible: boolean;
    uuid: string;
    name: string
    onClose?: () => void
}

export const DeleteSharedLinkModal = ({isVisible = false, onClose, uuid, name}: Props) => {
    const [data, {requestFn, errorRes}] = useDeleteSharedLink();

    const handleDelete = () => {
        requestFn({uuid})
        if (onClose) onClose()
    }

    if (!isVisible) return (<></>);

    return (
        <Modal title={`Удаление ссылки`}
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
                {name}
            </div>
        </Modal>
    );
};

