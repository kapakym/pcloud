import React, {useEffect, useState} from 'react';
import {useInfoSharelink, useUpdateSharedLink} from "../../../../entities/api/sharelinkApi/sharelinkApi";
import Modal from "../../../../shared/ui/Modal";
import Button from "../../../../shared/ui/Button";
import Input from "../../../../shared/ui/Input";
import {DatePicker} from "../../../../shared/ui/DatePicker/ui/DatePicker";
import {ClipboardDocumentIcon} from "@heroicons/react/24/outline";
import ButtonToolBar from "../../../../shared/ui/ButtonToolBar/ui/ButtonToolBar";
import Loader from "../../../../shared/loader";
import {IShareLinkInfoRes} from "../../../../entities/api/sharelinkApi/types/types";
import {useNotifications} from "../../../../shared/store/useNotifications/useNotifications";
import {NoticeType} from "../../../../shared/store/useNotifications/types/types";

interface Props {
    isVisible: boolean;
    onClose?: () => void
    uuid?: string
}

export const EditShareLinkModal = (
    {
        isVisible = false,
        onClose,
        uuid
    }: Props) => {
    const [pincode, setPincode] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [link, setLink] = useState<IShareLinkInfoRes>()
    const [data, {requestFn, isLoading}] = useInfoSharelink();
    const pushNotification = useNotifications(state => state.pushNotification)
    const [dataUpdate, {
        requestFn: requestFnUpdate,
        errorRes: errorUpdate
    }] = useUpdateSharedLink()

    useEffect(() => {
        if (uuid) {
            console.log(uuid)
            requestFn({uuid})
        }
    }, [uuid]);

    useEffect(() => {
        if (data) {
            setLink(data)
            if (data.date_to) setDateTo(new Date(data?.date_to).toISOString().substring(0, 10))
        }
    }, [data]);

    useEffect(() => {
        if (dataUpdate) {
            pushNotification({message: dataUpdate.message, type: NoticeType.PRIMARY})
        }
    }, [dataUpdate]);

    useEffect(() => {
        if (errorUpdate) {
            pushNotification({message: errorUpdate.response.data.message, type: NoticeType.DANGER})
        }
    }, [errorUpdate]);

    if (!isVisible) return (<></>);

    const handleUpdate = () => {
        if (uuid) requestFnUpdate({uuid, pincode, date_to: dateTo})
    }

    const handleCopyClipboard = () => {
        navigator.clipboard.writeText(`${location.protocol + '//' + location.host}/viewshare/${link}`);
    }

    if (isLoading) return (<Loader/>)

    return (
        <Modal title={`Доступ к ${data?.name}`}
               height='auto'
               width='90%'
               isVisible={isVisible}
               onClose={onClose}
               buttons={(
                   <>
                       <Button onClick={handleUpdate}>Обновить</Button>
                       <Button onClick={onClose}>Закрыть</Button>
                   </>
               )}
        >
            <div className='flex flex-col space-y-3'>
                <div>
                    <DatePicker
                        label={'Доступ до'}
                        value={dateTo}
                        onChange={(e) => setDateTo(e.currentTarget.value)}
                    />
                </div>
                <Input label='Пинкод'
                       value={pincode}
                       onChange={(e) => setPincode(e.currentTarget.value)}
                />
                <p>Ссылка для доступа:</p>
                {uuid &&
                    <div className='flex justify-between'>
                        <a className='hover:underline'
                           href={`${location.protocol + '//' + location.host}/viewshare/${uuid}`}>{link?.name}</a>
                        <ButtonToolBar onClick={handleCopyClipboard}>
                            <ClipboardDocumentIcon className={'w-8 h-8'}/>
                        </ButtonToolBar>
                    </div>
                }
            </div>
        </Modal>
    );
};

