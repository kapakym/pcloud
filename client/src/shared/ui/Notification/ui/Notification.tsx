import React, {useEffect} from 'react';
import {XMarkIcon} from "@heroicons/react/24/solid";
import {useNotifications} from "../../../store/useNotifications/useNotifications";
import {INotice} from "../../../store/useNotifications/types/types";

interface NotificationProps {
    timeOut: number
    notice: INotice
}

export const Notification = ({
                                 timeOut = 1000,
                                 notice
                             }: NotificationProps) => {
    // const [visible, setVisible] = useState(true)
    const popNotification = useNotifications(state => state.popNotification)

    useEffect(() => {
        setTimeout(() => {
            handleCLose()
        }, timeOut)
    }, []);

    function handleCLose() {
        popNotification()
    }

    return (
        <div
            className={`${notice.type} transform animate-[animateNotification_500ms] flex p-4  border-[1px] border-app-border rounded-xl `}>
            <div className='flex flex-col'>
                <div className='flex w-full justify-end absolute right-1 top-0'>
                    <XMarkIcon className='w-6 h-6' onClick={handleCLose}/>
                </div>
                <div className='mt-2'>
                    {notice.message}
                </div>
            </div>
        </div>
    );
};

