import React, {useEffect, useState} from 'react';
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/Button";
import {useLoginUser} from "../../entities/api/User/userApi";
import Loader from "../../shared/loader";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [data, {requestFn, isError, isLoading, errorRes}] = useLoginUser({
        password: "",
        email: ""
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('role', data.role)
            localStorage.setItem('folder', data.folder)
            navigate({pathname: '/files_list'})
        }
    }, [data]);

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

    const handleLogin = () => {
        requestFn({email, password})
    }

    const handleNavigateRegistration = () => {
        navigate({pathname: '/registration'})
    }

    return (
        <div className='w-full h-full justify-center items-center flex'>
            <div
                className='w-auto h-auto p-4 space-y-2 rounded-xl shadow-xl drop-shadow-xl border-[1px] border-solid border-app-border'>
                <div className='w-full text-center'>
                    Authorization in pCloud
                </div>
                {isLoading && <Loader/>}
                {!isLoading &&
                    <>
                        <Input placeholder={'Email'} value={email} onChange={handleChangeEmail}/>
                        <Input placeholder='Password' type='password' value={password} onChange={handleChangePassword}/>
                        <div className='w-full flex justify-center'>
                            <Button onClick={handleLogin}>Login</Button>
                        </div>
                        <div className='hover:underline cursor-pointer'
                             onClick={handleNavigateRegistration}>Registration
                        </div>
                    </>
                }
                {errorRes?.response?.data?.message &&
                    <div className='text-red-600'>
                        {errorRes?.response?.data?.message}
                    </div>
                }

            </div>
        </div>
    )
        ;
};

export default LoginPage;