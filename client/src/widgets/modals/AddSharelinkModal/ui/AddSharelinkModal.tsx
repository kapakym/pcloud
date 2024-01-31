import React, {useEffect, useState} from 'react';
import {useAddSharelink} from "../../../../entities/api/sharelinkApi/sharelinkApi";
import Modal from "../../../../shared/ui/Modal";
import Button from "../../../../shared/ui/Button";
import Input from "../../../../shared/ui/Input";
import {IShareObject} from "../types/types";
import {DatePicker} from "../../../../shared/ui/DatePicker/ui/DatePicker";
import {ClipboardDocumentIcon} from "@heroicons/react/24/outline";


interface IShareObjectPath extends IShareObject {
    path: string;
}

interface Props {
    isVisible: boolean;
    onClose?: () => void
    onCreate?: () => void
    shareObject: IShareObjectPath
}

export const AddSharelinkModal = (
    {
        isVisible = false,
        onClose,
        shareObject,
        onCreate
    }: Props) => {
    const [pincode, setPincode] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [link, setLink] = useState("")
    const [data, {requestFn}] = useAddSharelink();

    useEffect(() => {
        if (data?.uuid) {
            setLink(data.uuid)
        }
    }, [data]);

    if (!isVisible) return (<></>);

    const handleCreate = () => {
        requestFn({
            path: shareObject.path,
            name: shareObject.name,
            pincode: pincode,
            type: shareObject.type,
            is_pincode: !!pincode,
            date_to: dateTo
        })
    }

    return (
        <Modal title={`Доступ к ${shareObject.name}`}
               height='auto'
               width='40%'
               isVisible={isVisible}
               onClose={onClose}
               buttons={(
                   <>
                       <Button onClick={handleCreate}>{!link  ? 'Создать' : 'Обновить'}</Button>
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
                {link &&
                    <div className='flex justify-between'>
                        <a className='hover:underline' href={`${location.protocol + '//' + location.host}/viewshare?uuid=${link}`}>{shareObject.name}</a>
                        <ClipboardDocumentIcon className={'w-6 h-6'} />
                    </div>
                }
            </div>
        </Modal>
    );
};

