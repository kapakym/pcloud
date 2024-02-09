import React, {FC, useEffect, useState} from 'react';
import {useSetApprove} from "../../../../entities/api/User/userApi";
import {useNotifications} from "../../../store/useNotifications/useNotifications";
import {NoticeType} from "../../../store/useNotifications/types/types";

interface ISharedLinksItemProps {
    uuid: string,
    type: string,
    path: string,
    name: string,
    timelive: string,
}

export const SharedLinksItem: FC<ISharedLinksItemProps> = ({
timelive,
    name,
    uuid,
    type,
    path,
                                                     }) => {
    // const [data, {errorRes, requestFn, isLoading}] = useSetApprove()
    // const pushNotification = useNotifications(state => state.pushNotification)

    // useEffect(() => {
    //     if (errorRes) {
    //         pushNotification({message: errorRes.response.data.message, type: NoticeType.DANGER})
    //     }
    // }, [errorRes]);
    // const handleChangeApprove = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setIsApprove(e.target.checked)
    //     requestFn({id, approve: e.target.checked})
    // }
    return (
        <div className='grid-cols-4 grid items-center odd:bg-app-bg-primary even:bg-app-bg-secondary p-2'>
            <div>{name}</div>
            <div>{timelive}</div>
            <div>{type}</div>
            <div>{path}</div>
        </div>
    );
};