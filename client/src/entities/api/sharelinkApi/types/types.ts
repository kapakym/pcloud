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

export type IShareLinkInfoRes = Omit<IShareLinkAddRes, 'pincode'>

export interface IShareReq {
    uuid: string
    token?: string
    pincode?: string
    patch?: string
}