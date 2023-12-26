import React, {HTMLAttributes, InputHTMLAttributes} from 'react';
import {DivNode} from "tailwindcss/src/value-parser";
import {XMarkIcon} from '@heroicons/react/24/solid'

interface Props extends HTMLAttributes<HTMLDivElement> {
    title?: string
    onClose?: () => void;
}

const ModalRightDown = ({children, title, onClose}: Props) => {
    return (
        <div
            className='transition-all fixed flex flex-col w-[97%] md:w-[20%] border-[2px] border-solid border-black right-2 bottom-2 h-[90%] bg-white md:h-[20%] shadow-2xl rounded-xl'>
            <div className='flex justify-between items-center p-2 border-b-black border-b-[1px] border-solid  '>
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