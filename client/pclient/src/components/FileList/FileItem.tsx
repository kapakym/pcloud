import React from 'react';
import {FileTypes} from "./consts/fileTypes";

interface Props {
    name: string;
    fileType: FileTypes
    onClick?:()=>void
}

const FileItem = ({name, fileType, onClick}: Props) => {
    return (
        <div className='odd:bg-white even:bg-gray-200 grid grid-cols-2 hover:bg-gray-500 hover:text-white cursor-pointer' onClick={onClick}>
            <div>
                {name}
            </div>
            <div>
                {fileType}
            </div>
        </div>
    );
};

export default FileItem;