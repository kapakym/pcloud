import axios, {AxiosResponse, AxiosResponseHeaders, ResponseType} from "axios";

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
    progressFn?: (process: number) => void
}

const requestBuilder = <Res, Req>({
                                      url,
                                      method,
                                      options,
                                      responseType,
                                      progressFn
                                  }: Props<Req>): () => Promise<void | AxiosResponse<Res, any>> => {

    return () => axios({
        method,
        url,
        data: options?.data,
        responseType,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            homeFolder: localStorage.getItem('folder') || 'error',
            ...options?.headers
        },
        onUploadProgress: (progressEvent: any) => {
            let percentComplete: number = progressEvent.loaded / progressEvent.total
            percentComplete = percentComplete * 100;
            if (progressFn) {
                progressFn(percentComplete)
            }
        }
    }).then(response => {
        return response.data
    })

};

export default requestBuilder;