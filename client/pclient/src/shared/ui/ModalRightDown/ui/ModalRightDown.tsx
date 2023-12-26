import React, {HTMLAttributes} from 'react';
import {XMarkIcon} from '@heroicons/react/24/solid'

interface Props extends HTMLAttributes<HTMLDivElement> {
    title?: string
    onClose?: () => void;
}

const ModalRightDown = ({children, title, onClose}: Props) => {
    return (
        <div
            className='transition-all fixed flex flex-col w-[97%] md:w-[20%] right-2 bottom-2 border-[1px] border-b-gray-300 h-[90%] bg-white md:h-[20%] drop-shadow-md rounded-xl'>
            <div className='flex justify-between items-center p-2 border-b-gray-300 border-b-[1px] border-solid  '>
                <div>
                    {title}
                </div>
                <div onClick={onClose} className='cursor-pointer'>
                    <XMarkIcon className='w-6 h-6 color-black'/>
                </div>
            </div>
            <div className='p-2 overflow-y-auto mb-1 rounded-b-xl space-y-2'>
                {children}
            </div>
        </div>
    );
};

export default ModalRightDown;