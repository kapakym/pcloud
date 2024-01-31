import useRequest from "../../../shared/hooks/useRequest";
import {ISharelinkAddReq, IShareLinkAddRes} from "./types/types";

const SharelinkApi = {
    AddSharelink: (data?: ISharelinkAddReq) => useRequest<IShareLinkAddRes, ISharelinkAddReq>({
        url: '/api/sharelink/add',
        method: 'post',
        options: {
            data,
            headers: {
                homeFolder: localStorage.getItem('folder') || 'error'
            },
            isNotRequest:true
        }
    }),


}

export const {
    AddSharelink: useAddSharelink,
} = SharelinkApi