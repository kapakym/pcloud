import {useEffect, useState} from 'react';
import axios from "axios";

interface Options {
    isLoading: boolean
    isError: boolean
    requestFn: () => void;
}

interface Props<Req> {
    url: string
    method?: string
    options?: {
        params?: Req
    }
}

const useRequest = <Res, Req>({url, method, options}: Props<Req>): [Res | null, Options] => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [isError, setIsError] = useState(false)
    const axiosRequest = () => {
        setIsLoading(true);
        setIsError(false);
        setData(null)
        axios({
            method,
            url,
            params: options?.params
        }).then(response => {
            setData(response.data)
        }).catch(error => {
            setIsError(true)
            console.log(error)
        }).finally(() => {
            setIsLoading(false)
        });
    }

    useEffect(() => axiosRequest(), [])

    return [data, {isLoading, isError, requestFn: axiosRequest}]
};

export default useRequest;