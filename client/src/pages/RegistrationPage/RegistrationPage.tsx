import React, {useEffect, useState} from 'react';
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/Button";
import {useRegistrationUser} from "../../entities/api/User/userApi";
import Loader from "../../shared/loader";
import {useNavigate} from "react-router-dom";

const RegistrationPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [data, {requestFn, isError, isLoading, errorRes}] = useRegistrationUser({})
    const navigate = useNavigate()

    useEffect(() => {
        if (errorRes?.response?.data?.message) {
            console.log(errorRes?.response?.data?.message)
        }
    }, [errorRes]);

    const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const handleRegistration = () => {
        requestFn({email, password})
    }

    const handleNavigateLogin = () => {
        navigate({pathname: '/'})
    }


    return (
        <div className='w-full h-full justify-center items-center flex'>
            <div className='w-auto border-app-border drop-shadow-xl border-[1px] h-auto p-4 space-y-2 rounded-xl shadow-xl'>
                <div className='w-full text-center'>
                    Регистрация в pCloud
                </div>
                {isLoading && <Loader/>}
                {!isLoading &&
                    <>
                        <Input placeholder={'Email'} value={email} onChange={handleChangeEmail}/>
                        <Input placeholder='Пароль' type='password' value={password} onChange={handleChangePassword}/>
                        <div className='w-full flex justify-center'>
                            <Button onClick={handleRegistration}>Отправить запрос</Button>
                        </div>
                        <div className='hover:underline cursor-pointer' onClick={handleNavigateLogin}>Войти</div>
                    </>
                }
                {errorRes?.response?.data?.message &&
                    <div className='text-red-600'>
                        {errorRes?.response?.data?.message}
                    </div>
                }

                {data?.message &&
                    <div className='text-green-600'>
                        {data?.message}
                    </div>
                }

            </div>
        </div>
    )
};

export default RegistrationPage;