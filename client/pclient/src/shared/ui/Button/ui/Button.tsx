import React, {ButtonHTMLAttributes, FC} from 'react';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props, context) => {
    return (
        <button
            // className="rounded bg-[#3b71ca] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#386bc0] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#386bc0] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#3566b6] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
            className=' border-[1px] border-app-border p-2 rounded-xl shadow-xl bg-app-button-primary hover:bg-app-button-hover  transition-all duration-500 drop-shadow-xl  flex' {...props}>
            {props.children}
        </button>
    );
};

export default Button;