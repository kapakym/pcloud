import React from 'react';

import {useNavigate} from "react-router-dom";
import MenuButton from "../../../shared/ui/MenuButton";
import {ArrowRightStartOnRectangleIcon} from "@heroicons/react/16/solid";
import {FolderIcon, ShareIcon, UsersIcon} from "@heroicons/react/24/outline";

const Header = () => {
    const navigate = useNavigate()
    const handleExit = () => {
        localStorage.removeItem('token');
        navigate({pathname: '/'})
    }

    const handleNavigateToUsers = () => {
        navigate({pathname: '/userlist'})
    }
    const handleNavigateToFileList = () => {
        navigate({pathname: '/files_list'})
    }

    const handleNavigateToSharedlinksList = () => {
        navigate({pathname: '/sharedlinkslist'})
    }

    return (
        <div className='h-[50px] w-full border-b-[1px] border-b-solid border-b-app-border p-2 flex justify-between items-center'>
            <div>
                <a href={'https://github.com/kapakym/pcloud'} target={"_blank"}>
                    pCloud
                </a>
            </div>
            <div className=''>
                {!!localStorage.getItem('token') &&
                    <div className='flex w-auto space-x-2 '>
                        <MenuButton onClick={handleNavigateToFileList}>
                            <FolderIcon className='h-6 w-6' />
                        </MenuButton>
                        <MenuButton onClick={handleNavigateToSharedlinksList}>
                            <ShareIcon className='h-6 w-6' />
                        </MenuButton>
                        <MenuButton onClick={handleNavigateToUsers}>
                            <UsersIcon className='h-6 w-6' />
                        </MenuButton>
                        <MenuButton onClick={handleExit}>
                            <ArrowRightStartOnRectangleIcon className='h-6 w-6' />
                        </MenuButton>
                    </div>

                }
            </div>
        </div>
    );
};

export default Header;