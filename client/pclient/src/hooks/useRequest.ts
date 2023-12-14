import {useEffect, useState} from 'react';
import axios from "axios";

interface Options<Req> {
    isLoading: boolean
    isError: boolean
    requestFn: (options:Req) => void;
}

interface Props<Req> {
    url: string
    method?: string
    options?: {
        params?: Req
    }
}

const useRequest = <Res, Req>({url, method, options}: Props<Req>): [Res | null, Options<Req>] => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Res | null>(null)
    const [isError, setIsError] = useState(false)
    const axiosRequest = (data?:Req) => {
        setIsLoading(true);
        setIsError(false);
        setData(null)
        axios({
            method,
            url,
            data: data
        }).then(response => {
            setData(response.data)
        }).catch(error => {
            setIsError(true)
            console.log(error)
        }).finally(() => {
            setIsLoading(false)
        });
    }

    useEffect(() => axiosRequest(options?.params), [])

    return [data, {isLoading, isError, requestFn: axiosRequest}]
};

export default useRequest;