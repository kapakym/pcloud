import React, {HTMLAttributes} from 'react';
import {XMarkIcon} from '@heroicons/react/24/solid'

interface Props extends HTMLAttributes<HTMLDivElement> {
    title?: string
    onClose?: () => void;
}

const ModalRightDown = ({children, title, onClose}: Props) => {
    return (
        <div
            className='animate-[modal_500ms] fixed flex flex-col w-[88%] md:w-[50%] right-2 bottom-2 border-[1px] border-app-border h-[90%] bg-app-bg-primary md:h-[50%] drop-shadow-md rounded-xl translate-x-[-5%] translate-y-[-5%]'>
            <div className='flex justify-between items-center p-2 border-b-app-border border-b-[1px] border-solid  text-app-text-primary'>
                <div>
                    {title}
                </div>
                <div onClick={onClose} className='cursor-pointer'>
                    <XMarkIcon className='w-6 h-6 color-black text-app-text-primary'/>
                </div>
            </div>
            <div className='p-2 overflow-y-auto mb-2 rounded-b-xl space-y-2'>
                {children}
            </div>
        </div>
    );
};

export default ModalRightDown;