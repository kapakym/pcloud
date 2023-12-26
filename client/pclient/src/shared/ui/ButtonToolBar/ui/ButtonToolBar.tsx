import React, {ButtonHTMLAttributes, FC} from 'react';

const ButtonToolBar: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button
            className='border-[1px] border-app-border p-2 rounded-xl  bg-app-button-primary hover:bg-app-button-hover  transition-all duration-500  flex' {...props}>
            {props.children}
        </button>
    );
};

export default ButtonToolBar;