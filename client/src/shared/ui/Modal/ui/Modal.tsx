import React, {HTMLAttributes} from 'react';
import {XMarkIcon} from "@heroicons/react/24/solid";

interface Props extends HTMLAttributes<HTMLDivElement> {
    title?: string
    width?: string
    height?: string
    buttons?: React.ReactNode
    isVisible?: boolean
    onClose?: () => void
}

const Modal = ({
                   title,
                   width = 'w-[40%]',
                   height = 'h-[40%]',
                   children,
                   buttons,
                   isVisible = false,
                   onClose
               }: Props) => {

    return (
        <>
            {isVisible &&
                <>
                    <div
                        className='fixed h-[100dvh] w-[100dvw] top-[0px] left-0 opacity-50 backdrop-blur-xl bg-white/30 z-10'
                        onClick={onClose}
                    ></div>
                    <div
                        className={`${width} ${height} flex  whitespace-nowrap  flex-col rounded-xl fixed top-[50%] left-[50%] bg-app-bg-primary drop-shadow-2xl translate-x-[-50%] translate-y-[-50%] max-h-[90dvh] z-10 `}>
                        <div className=' flex justify-between border-b-app-border border-b-[1px] p-4 '>
                            <div className=''>
                                {title}
                            </div>
                            <XMarkIcon
                                className='h-6 w-6 cursor-pointer '
                                onClick={onClose}
                            />
                        </div>
                        <div className='p-4 overflow-auto'>
                            {children}
                        </div>
                        <div
                            className='flex border-t-[1px] border-t-solid border-t-app-border p-4 items-center space-x-2'>
                            {buttons}
                        </div>
                    </div>
                </>
            }
        </>


    )
        ;
};

export default Modal;