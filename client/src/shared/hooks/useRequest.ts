import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios, {AxiosError, AxiosResponseHeaders, ResponseType} from "axios";

interface OptionsRequestFn {
    uuid?: string
}

interface Result<Req> {
    isLoading: boolean
    isError: boolean
    errorRes: any
    requestFn: (data: Req, optionsFn?: OptionsRequestFn) => void;
    percentage: {
        progress: number,
        uuid: string | undefined
    } | undefined,
    responseHeaders: Partial<AxiosResponseHeaders> | null
    requestData: Req | undefined

}

type AxiosRequestHeaders = {
    [x: string]: string | number | boolean;
}

interface Props<Req> {
    url: string
    method?: string
    options?: {
        isNotRequest?: boolean,
        data?: Req
        headers?: AxiosRequestHeaders,
        id?: string,
    },
    responseType?: ResponseType
}

const useRequest = <Res, Req>({url, method, options, responseType}: Props<Req>): [Res | null, Result<Req>] => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Res | null>(null)
    const [responseHeaders, setResponseHeaders] = useState<Partial<AxiosResponseHeaders> | null>(null)
    const [isError, setIsError] = useState(false)
    const [percentage, setPercentage] = useState<{ progress: number, uuid: string | undefined }>()
    const [errorRes, setErrorRes] = useState<AxiosError | null>(null)

    const navigate = useNavigate()
    const axiosRequest = (data?: Req, optionsFn?: OptionsRequestFn): Promise<any> => {
        setIsLoading(true);
        setIsError(false);
        setData(null)
        return axios({
            method,
            url,
            data: data,
            responseType,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                ...options?.headers
            },
            onUploadProgress: (progressEvent: any) => {
                let percentComplete: number = progressEvent.loaded / progressEvent.total
                percentComplete = percentComplete * 100;
                setPercentage({
                    uuid: optionsFn?.uuid,
                    progress: percentComplete
                })
                console.log(percentComplete);
            }
        }).then(response => {
            setResponseHeaders(response.headers)
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
                axiosRequest(options?.data)
        }
        , [])

    return [data, {
        isLoading,
        isError,
        requestFn: axiosRequest,
        errorRes,
        percentage,
        responseHeaders,
        requestData: options?.data
    }]
};

export default useRequest;