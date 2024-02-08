import React, {FC, ButtonHTMLAttributes} from 'react';

const MenuButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        // <button className='m-1 bg-gray-500 text-white p-2 rounded-xl hover:bg-black hover:text-white transition-all duration-500 transform active:scale-x-75 transition-transform flex'
        <button className='border-[1px] border-app-border p-2 rounded-xl  bg-app-button-primary hover:bg-app-button-hover  transition-all duration-500 drop-shadow-2xl active:drop-shadow-none flex'
                {...props}>
            {props.children}
        </button>
    );
};

export default MenuButton;