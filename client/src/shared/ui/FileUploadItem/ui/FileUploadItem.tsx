import React from 'react';
import {XMarkIcon} from "@heroicons/react/24/solid";

interface Props {
    title?: string
    progress?: number
    onClose?: (id?: string) => void
    id?: string
    error?: string
}

const FileUploadItem = ({title, onClose, id, progress = 0, error}: Props) => {
    const handleCloseFile = () => {
        if (onClose) {
            onClose(id)
        }
    }


    return (
        <div className={`flex flex-col w-full border-[1px] border-solid border-app-border  ${error ? 'bg-app-bg-danger' : 'bg-app-bg-secondary'} text-app-text-primary p-2 rounded-xl`}>
            <div className='flex justify-between items-center w-full space-x-2 '>
                <div className='overflow-x-auto overflow-ellipsis'>
                    {title}
                </div>
                <div className='bg-white rounded-xl' onClick={handleCloseFile}>
                    <XMarkIcon className='w-6 h-6 text-black cursor-pointer'/>
                </div>
            </div>
            <div className='py-2'>
                {error &&
                    <div className='text-yellow-200'>
                        {error}
                    </div>
                }
                {!error &&
                    <div className='w-full h-6 border-[1px] border-solid rounded-xl flex relative'>
                        <div className={`bg-green-600 rounded-xl`} style={{width: `${progress}%`}}></div>
                        <div className='h-full  absolute text-white w-full  text-center'>{Math.trunc(progress)}%</div>
                    </div>
                }

            </div>

        </div>
    );
};

export default FileUploadItem;