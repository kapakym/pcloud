import React from 'react';
import {} from '@heroicons/react/24/solid'
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    const handleExit = () => {
        localStorage.removeItem('token');
        navigate({pathname: '/'})
    }
    return (
        <div className='h-[50px] w-full border-2 border-red-500 p-2 flex'>
            <div>
                pCloud
            </div>
            <div onClick={handleExit}>
                Выход
            </div>
        </div>
    );
};

export default Header;