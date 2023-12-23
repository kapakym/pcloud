import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {Simulate} from "react-dom/test-utils";

interface Result<Req> {
    isLoading: boolean
    isError: boolean
    errorRes: any
    requestFn: (options: Req) => void;
}

interface Props<Req> {
    url: string
    method?: string
    options?: {
        isNotRequest?: boolean,
        params?: Req
    }
}

const useRequest = <Res, Req>({url, method, options}: Props<Req>): [Res | null, Result<Req>] => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Res | null>(null)
    const [isError, setIsError] = useState(false)
    const [errorRes, setErrorRes] = useState<AxiosError | null>(null)
    const navigate = useNavigate()
    const axiosRequest = (data?: Req) => {
        setIsLoading(true);
        setIsError(false);
        setData(null)

        axios({
            method,
            url,
            data: data,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            setData(response.data)
        }).catch((error: Error | AxiosError) => {
            if (axios.isAxiosError(error)) {
                console.log(error)
                setIsError(true)
                setErrorRes(error);
                if (error?.response?.status === 401) {
                    navigate({
                        pathname: '/login'
                    })
                }
            }
            // throw  new Error(error as any)
        }).finally(() => {
            setIsLoading(false)
        });

    }

    useEffect(() => {
            if (!options?.isNotRequest)
                axiosRequest(options?.params)
        }
        , [])

    return [data, {isLoading, isError, requestFn: axiosRequest, errorRes}]
};

export default useRequest;