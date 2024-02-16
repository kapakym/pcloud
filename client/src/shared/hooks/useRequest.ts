import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios, {AxiosError, AxiosResponseHeaders, ResponseType} from "axios";
import {useNotifications} from "../store/useNotifications/useNotifications";
import {NoticeType} from "../store/useNotifications/types/types";
import requestBuilder from "../store/requestBuilder";

interface OptionsRequestFn {
    uuid?: string
}

interface Result<Req> {
    isLoading: boolean
    isError: boolean
    errorRes: any
    requestFn: (data: Req, optionsFn?: OptionsRequestFn) => void;

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
    const [errorRes, setErrorRes] = useState<AxiosError | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
            if (!options?.isNotRequest)
                axiosRequest(options?.data)
        }
        , [])

    const pushNotification = useNotifications(state => state.pushNotification)
    const axiosRequest = (data?: Req): Promise<any> => {
        setIsLoading(true);
        setIsError(false);
        setData(null)
        return requestBuilder({
            url,
            method,
            options: {
                data
            },
            responseType,
        })().then(response => {
            if ('message' in response.data) {
                pushNotification({message: response.data.message, type: NoticeType.PRIMARY})
            }
            setResponseHeaders(response.headers)
            setData(response.data)
        }).catch((error: Error | AxiosError) => {
            if (axios.isAxiosError(error)) {
                console.log(error)
                setIsError(true)
                if ('message' in error?.response?.data) {
                    pushNotification({message: error?.response?.data?.message, type: NoticeType.DANGER})
                }
                setErrorRes(error);
                if (error?.response?.status === 401) {
                    navigate({
                        pathname: '/'
                    })
                }
            }
            // throw  new Error(error as any)
        }).finally(() => {
            setIsLoading(false)
        });
    }

    return [data, {
        isLoading,
        isError,
        requestFn: axiosRequest,
        errorRes,
        responseHeaders,
        requestData: options?.data
    }]
};

export default useRequest;