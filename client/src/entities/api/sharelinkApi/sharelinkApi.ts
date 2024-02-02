import useRequest from "../../../shared/hooks/useRequest";
import {ISharelinkAddReq, IShareLinkAddRes, IShareLinkInfoRes, IShareReq} from "./types/types";
import {ResponseGetFilesShare} from "../filesApi/types/filesTypes";

const SharelinkApi = {
    AddSharelink: (data?: ISharelinkAddReq) => useRequest<IShareLinkAddRes, ISharelinkAddReq>({
        url: '/api/sharelink/add',
        method: 'post',
        options: {
            data,
            headers: {
                homeFolder: localStorage.getItem('folder') || 'error'
            },
            isNotRequest: true
        }
    }),

    getInfoShareLink: (data: { uuid: string }) => useRequest<IShareLinkInfoRes, { uuid: string }>({
        url: '/api/sharelink/info',
        method: 'post',
        options: {
            data,
            isNotRequest: true
        }
    }),

    getShare: (data?: IShareReq) => useRequest<ResponseGetFilesShare, IShareReq>({
        url: '/api/sharelink/share',
        method: 'post',
        options: {
            data,
            isNotRequest: true
        }
    })
}

export const {
    AddSharelink: useAddSharelink,
    getInfoShareLink: useInfoSharelink,
    getShare: useSharelink
} = SharelinkApi