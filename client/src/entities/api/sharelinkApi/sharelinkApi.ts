import useRequest from "../../../shared/hooks/useRequest";
import {
    IGetSharedLinksRes,
    ISharelinkAddReq,
    IShareLinkAddRes,
    IShareLinkInfoRes,
    IShareReq,
    IUpdateDareLinkReq
} from "./types/types";
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

    getInfoShareLink: (data?: { uuid: string }) => useRequest<IShareLinkInfoRes, { uuid: string }>({
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
    }),

    getShareLinksList: () => useRequest<IGetSharedLinksRes[], unknown>({
        url: '/api/sharelink/sharedlinkslist',
        method: 'get',
    }),

    updateShareLink: (data?: IUpdateDareLinkReq) => useRequest<{ message: string }, IUpdateDareLinkReq>({
        url: '/api/sharelink/update',
        method: 'post',
        options: {
            data,
            isNotRequest: true
        }
    }),

    deleteShareLink: (data?: { uuid: string }) => useRequest<{ message: string }, { uuid: string }>({
        url: '/api/sharelink/delete',
        method: 'delete',
        options: {
            data,
            isNotRequest: true
        }
    })


}

export const {
    AddSharelink: useAddSharelink,
    getInfoShareLink: useInfoSharelink,
    getShare: useSharelink,
    getShareLinksList: useSharedLinksList,
    updateShareLink: useUpdateSharedLink,
    deleteShareLink: useDeleteSharedLink
} = SharelinkApi