import React from 'react';

import {useNavigate} from "react-router-dom";
import MenuButton from "../../../shared/ui/MenuButton";

const Header = () => {
    const navigate = useNavigate()
    const handleExit = () => {
        localStorage.removeItem('token');
        navigate({pathname: '/login'})
    }
    return (
        <div className='h-[50px] w-full border-2 border-red-500 p-2 flex justify-between items-center'>
            <div>
                pCloud
            </div>
            <div className='space-x-2'>
                {!!localStorage.getItem('token') &&
                    <MenuButton onClick={handleExit}>
                        Выход
                    </MenuButton>
                }
            </div>
        </div>
    );
};

export default Header;