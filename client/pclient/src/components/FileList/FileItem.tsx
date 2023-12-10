import React from 'react';
import {FileTypes} from "./consts/fileTypes";

interface Props {
    name: string;
    fileType: FileTypes
}

const FileItem = ({name, fileType}: Props) => {
    return (
        <div className='odd:bg-white even:bg-gray-200 grid grid-cols-2 hover:bg-gray-500 hover:text-white cursor-pointer'>
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