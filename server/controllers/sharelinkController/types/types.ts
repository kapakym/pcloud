export interface ISharelinkAddReq {
    path: string;
    type: string;
    name: string;
    pincode?: string,
    date_to?: string
}

export interface IShareLinkAddRes {
    message: string
    uuid: string
    name: string
}

export interface IShareInfoReq {
    uuid: string
}

export interface IShareInfoRes extends Omit<ISharelinkAddReq, 'pincode'> {
    is_pincode: boolean
}
