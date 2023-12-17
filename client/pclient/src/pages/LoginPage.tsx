import React, {useState} from 'react';
import Input from "../shared/ui/Input";
import Button from "../shared/ui/Button";
import {useLoginUser} from "../entities/api/User/userApi";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [token, {requestFn}] = useLoginUser({
        password: "",
        email: ""
    })

    const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const handleLogin = () => {
        console.log('safdasdfas')
        requestFn({email, password})
    }

    return (
        <div className='w-full h-full justify-center items-center flex'>
            <div className='w-auto border-black border-[1px] h-auto p-4 space-y-2 rounded-xl shadow-xl'>
                <div>
                    Авторизация pCloud
                </div>

                <Input placeholder={'Email'} value={email} onChange={handleChangeEmail}/>
                <Input placeholder='Пароль' type='password' value={password} onChange={handleChangePassword}/>
                <Button onClick={handleLogin}>Вход</Button>
            </div>


        </div>
    );
};

export default LoginPage;