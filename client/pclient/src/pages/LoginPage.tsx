import React from 'react';
import Input from "../shared/ui/Input";
import Button from "../shared/ui/Button";

const LoginPage = () => {
    return (
        <div className='w-full h-full justify-center items-center flex'>
            <div className='w-auto border-black border-[1px] h-auto p-4 space-y-2 rounded-xl shadow-xl'>
                <div>
                    Авторизация pCloud
                </div>

                <Input placeholder={'Email'}/>
                <Input placeholder='Пароль' type='password'/>

                <Button>Вход</Button>
            </div>


        </div>
    );
};

export default LoginPage;