import React, {FC, InputHTMLAttributes} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const DatePicker: FC<Props> = (props: Props, context) => {
    const {label, width} = props
    return (

        <div className='flex items-center space-x-2'>
            {label &&
                <label>{label}</label>
            }
            <input
                type={"date"}
                className='w-full border-[1px] rounded-xl p-2 border-solid border-app-border bg-app-button-primary drop-shadow-xl block focus:outline-none focus:ring-0'
                {...props}
            />
        </div>
    )
};

