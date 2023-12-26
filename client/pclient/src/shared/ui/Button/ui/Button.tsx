import React, {ButtonHTMLAttributes, FC} from 'react';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props, context) => {
    return (
        <button className='border-[1px] border-app-border p-2 rounded-xl shadow-xl bg-app-button-primary hover:bg-app-button-hover  transition-all duration-500 drop-shadow-xl  flex' {...props}>
            {props.children}
        </button>
    );
};

export default Button;