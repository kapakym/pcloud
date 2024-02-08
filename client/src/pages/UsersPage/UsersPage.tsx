import React, {useState} from 'react';
import {useGetUsers} from "../../entities/api/User/userApi";
import {UserItem} from "../../shared/ui/UserItem/ui/UserItem";
import Input from "../../shared/ui/Input";

export const UsersPage = () => {
    const [data] = useGetUsers()
    const [filter, setFilter] = useState("")
    const handleChangeFilter = (e: React.FormEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value)
    }
    return (
        <div className='w-auto h-full overflow-auto'>
            <div className='my-2 p-2'>
                <Input label={'Фильтр'} value={filter} onChange={handleChangeFilter}/>
            </div>
            {data &&
                data.filter(fItem => fItem.email.includes(filter)).map(item => (
                    <UserItem
                        email={item.email}
                        approve={item.approve}
                        homeFolder={item.home_folder}
                        id={item.id}
                    />
                ))
            }
        </div>
    );
};

