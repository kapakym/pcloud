import React, {useEffect} from 'react';
import {useDeleteSharedLink} from "../../../../entities/api/sharelinkApi/sharelinkApi";
import Modal from "../../../../shared/ui/Modal";
import Button from "../../../../shared/ui/Button";
import {NoticeType} from "../../../../shared/store/useNotifications/types/types";
import {useNotifications} from "../../../../shared/store/useNotifications/useNotifications";

interface Props {
    isVisible: boolean;
    uuid: string;
    name: string
    onClose?: () => void
}

export const DeleteSharedLinkModal = ({isVisible = false, onClose, uuid, name}: Props) => {
    const [data, {requestFn, errorRes}] = useDeleteSharedLink();
    const pushNotification = useNotifications(state => state.pushNotification)


    const handleDelete = () => {
        requestFn({uuid})
        if (onClose) onClose()
    }

    useEffect(() => {
        if (data) {
            pushNotification({message: data.message, type: NoticeType.PRIMARY})
        }
    }, [data]);

    useEffect(() => {
        if (errorRes) {
            pushNotification({message: errorRes.response.data.message, type: NoticeType.DANGER})
        }
    }, [errorRes]);

    if (!isVisible) return (<></>);

    return (
        <Modal title={`Удаление ссылки`}
               height='auto'
               width='40%'
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

