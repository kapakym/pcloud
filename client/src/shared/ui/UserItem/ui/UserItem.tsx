import React, {FC, useEffect, useState} from 'react';
import {useSetApprove} from "../../../../entities/api/User/userApi";
import {useNotifications} from "../../../store/useNotifications/useNotifications";
import {NoticeType} from "../../../store/useNotifications/types/types";

interface IUserItemsProps {
    email: string;
    approve: boolean;
    homeFolder: string
    id: number
}

export const UserItem: FC<IUserItemsProps> = ({email, approve, homeFolder, id}) => {
    const [isApprove, setIsApprove] = useState(approve)
    const [data, {errorRes, requestFn, isLoading}] = useSetApprove()
    const pushNotification = useNotifications(state => state.pushNotification)

    useEffect(() => {
        if (errorRes) {
            pushNotification({message: errorRes.response.data.message, type: NoticeType.DANGER})
        }
    }, [errorRes]);
    const handleChangeApprove = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsApprove(e.target.checked)
        requestFn({id, approve: e.target.checked})
    }
    return (
        <div className='grid-cols-3 grid items-center odd:bg-app-bg-primary even:bg-app-bg-secondary p-2'>
            <div>{email}</div>
            {isLoading && <span className='loaderCircle h-8 w-8'></span>}
            {!isLoading &&
                <input
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    type='checkbox' checked={isApprove} onChange={handleChangeApprove}/>
            }
            <div>{homeFolder}</div>
        </div>
    );
};