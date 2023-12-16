import React, {FC, InputHTMLAttributes, useState} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const Input: FC<Props> = (props) => {
    return (
        <div className='flex items-center space-x-2'>
            {props.label &&
                <label>{props.label}</label>
            }
            <input
                className='w-full border-[1px] rounded-xl p-1 border-solid border-black block focus:outline-none focus:ring-0' {...props}
            />
        </div>
    )
};

export default Input;