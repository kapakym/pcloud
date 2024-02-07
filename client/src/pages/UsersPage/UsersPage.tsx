import React from 'react';
import {useGetUsers} from "../../entities/api/User/userApi";
import {UserItem} from "../../shared/ui/UserItem/ui/UserItem";

export const UsersPage = () => {
    const [data] = useGetUsers()
    console.log(data)
    return (
        <div>
            {data &&
                data.map(item => (
                    <UserItem email={item.email} approve={item.approve} homeFolder={item.home_folder} />
                ))
            }
        </div>
    );
};

