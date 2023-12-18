import React from 'react';
import {FileTypes} from "../../../consts/fileTypes";
import {TrashIcon} from '@heroicons/react/24/solid'

interface Props {
    name: string;
    fileType: FileTypes
    onClick?: () => void
}

const FileItem = ({name, fileType, onClick}: Props) => {
    return (
        <div
            className='odd:bg-white justify-between even:bg-gray-200 sm:flex flex hover:bg-gray-500 hover:text-white cursor-pointer'
            onClick={onClick}>
            <div className=''>
                {name}
            </div>
            <div className='flex space-x-2 p-1'>
                <div className={'hidden sm:block'}>
                    {fileType}
                </div>
                <div>
                    <TrashIcon className='h-6 w-6 cursor-pointer hover:text-white'/>
                </div>
            </div>


        </div>
    );
};

export default FileItem;