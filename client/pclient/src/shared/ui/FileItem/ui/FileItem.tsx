import React from 'react';
import {FileTypes} from "../../../consts/fileTypes";
import {LinkIcon, ShareIcon, TrashIcon, FolderIcon, DocumentIcon} from "@heroicons/react/24/outline";
import {sizeFormat} from "../../../utils/files";

interface Props {
    name: string;
    fileType: FileTypes
    onClick?: () => void
    size?: number
}

const FileItem = ({name, fileType, onClick, size}: Props) => {
    return (
        <div
            className='odd:bg-app-bg-primary justify-between even:bg-app-bg-secondary sm:flex flex hover:bg-gray-500 hover:text-white cursor-pointer'
            onClick={onClick}>
            <div className='flex space-x-2 items-center'>
                <div>
                    {fileType === FileTypes.DIR && <FolderIcon className='h-6 w-6 cursor-pointer hover:text-white'/>}
                    {fileType === FileTypes.FILE && <DocumentIcon className='h-6 w-6 cursor-pointer hover:text-white'/>}
                </div>
                <div className=''>
                    {name}
                </div>
            </div>

            <div className='flex space-x-2 p-1'>
                <div className='hidden sm:flex space-x-2'>
                    <div>
                        {size && sizeFormat(size)}
                    </div>
                    <div>
                        {fileType}
                    </div>
                </div>
                <div className='flex space-x-2'>
                    {fileType !== FileTypes.UP_DIR &&
                        <>
                            <TrashIcon className='h-6 w-6 cursor-pointer hover:text-white'/>
                            <ShareIcon className='h-6 w-6 cursor-pointer hover:text-white'/>
                            <LinkIcon className='h-6 w-6 cursor-pointer hover:text-white'/>
                        </>

                    }

                </div>
            </div>


        </div>
    );
};

export default FileItem;