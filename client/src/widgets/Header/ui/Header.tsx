import React from 'react';

import {useNavigate} from "react-router-dom";
import MenuButton from "../../../shared/ui/MenuButton";
import {ArrowRightStartOnRectangleIcon} from "@heroicons/react/16/solid";

const Header = () => {
    const navigate = useNavigate()
    const handleExit = () => {
        localStorage.removeItem('token');
        navigate({pathname: '/'})
    }
    return (
        <div className='h-[50px] w-full border-b-[1px] border-b-solid border-b-app-border p-2 flex justify-between items-center'>
            <div>
                pCloud
            </div>
            <div className='space-x-2'>
                {!!localStorage.getItem('token') &&
                    <MenuButton onClick={handleExit}>
                        <ArrowRightStartOnRectangleIcon className='h-6 w-6' />
                    </MenuButton>
                }
            </div>
        </div>
    );
};

export default Header;