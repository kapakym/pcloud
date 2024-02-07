import React, {FC, useState} from 'react';

interface IUserItemsProps {
    email: string;
    approve: boolean;
    homeFolder: string
}

export const UserItem: FC<IUserItemsProps> = ({email, approve, homeFolder}) => {
    const [isApprove, setIsApprove] = useState(approve)
    const handleChangeApprove = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsApprove(e.target.checked)
    }
    return (
        <div className='flex justify-between items-center odd:bg-app-bg-primary even:bg-app-bg-secondary p-2'>
            <div>{email}</div>
            <input
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                type='checkbox' checked={isApprove} onChange={handleChangeApprove}/>
            <div>{homeFolder}</div>
        </div>
    );
};