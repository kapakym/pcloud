export interface ISharelinkAddReq {
    path: string;
    name: string
    type: string;
    is_pincode: boolean;
    pincode?: string,
    date_to?: string
}

export interface IShareLinkAddRes {
    message: string
    uuid: string
    name: string
}