import React, {useEffect, useState} from 'react';
import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import {useCreateFolder} from "../../../entities/api/filesApi/filesApi";

interface Props {
    isVisible: boolean;
    errorLabel?: string
    onClose?: () => void
    onPincode?: (pincode: string) => void
}

export const PinCodeModal = ({isVisible = false, onClose, errorLabel, onPincode}: Props) => {
    const [pincode, setPincode] = useState("")
    const [data, {requestFn}] = useCreateFolder();


    if (!isVisible) return (<></>);

    const handleOnPincode = () => {
        if (onPincode) {
            onPincode(pincode)
        }
    }

    return (
        <Modal title={"Доступ"}
               height='auto'
               width='40%'
               isVisible={isVisible}
               onClose={onClose}
               buttons={(
                   <>
                       <Button onClick={handleOnPincode}>Ок</Button>
                       <Button onClick={onClose}>Отмена</Button>
                   </>
               )}
        >
            <Input label='Пинкод'
                   value={pincode}
                   onChange={(e) => setPincode(e.currentTarget.value)}
            />
            <p className='mt-4 text-app-bg-danger  p-3 rounded-xl'>
                {errorLabel}
            </p>

        </Modal>
    );
};

