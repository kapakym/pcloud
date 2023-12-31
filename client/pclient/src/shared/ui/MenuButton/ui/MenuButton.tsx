import React, {FC, ButtonHTMLAttributes} from 'react';

const MenuButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props, context) => {
    return (
        <button className='bg-gray-500 text-white p-2 rounded-xl shadow-xl hover:bg-black hover:text-white transition-all duration-500 transform active:scale-x-75 transition-transform mx-5 flex'
                {...props}>
            {props.children}
        </button>
    );
};

export default MenuButton;