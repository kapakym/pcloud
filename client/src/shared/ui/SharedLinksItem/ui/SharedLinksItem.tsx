import React, {FC} from 'react';
import {DocumentIcon, FolderIcon, PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import {FileTypes} from "../../../types/FIles/fileTypes";

interface ISharedLinksItemProps {
    uuid: string,
    type: keyof typeof FileTypes,
    path: string,
    name: string,
    timeLive: string,
    onEdit: (uuid: string) => void
    onDelete: (uuid: string, name: string) => void
}

export const SharedLinksItem: FC<ISharedLinksItemProps> = ({
                                                               timeLive,
                                                               name,
                                                               uuid,
                                                               type,
                                                               path,
                                                               onEdit,
                                                               onDelete
                                                           }) => {
    const handleEdit = () => {
        if (onEdit) {
            onEdit(uuid)
        }
    }

    const handleDelete = () => {
        onDelete(uuid, name)
    }

    return (
        <div
            className='grid-cols-5 grid items-center odd:bg-app-bg-primary even:bg-app-bg-secondary p-2 hover:bg-gray-500'>
            <div>{name}</div>
            <div>{timeLive ? new Date(timeLive).toLocaleDateString() : "-"}</div>
            <div>

                {FileTypes[type] === FileTypes.DIR &&
                    <FolderIcon className='h-6 w-6 cursor-pointer hover:text-white'/>}
                {FileTypes[type] === FileTypes.FILE &&
                    <DocumentIcon className='h-6 w-6 cursor-pointer hover:text-white'/>}
            </div>
            <div>{path}</div>
            <div className='flex w-full justify-end space-x-2 items-center'>
                <PencilIcon
                    onClick={handleEdit}
                    className='h-8 w-8 cursor-pointer hover:text-app-bg-primary'/>
                <TrashIcon
                    onClick={handleDelete}
                    className='h-8 w-8 cursor-pointer hover:text-app-bg-primary'/>
            </div>
        </div>
    );
};