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

export type IShareLinkInfoRes = Omit<ISharelinkAddReq, 'pincode'>

export interface IShareReq {
    uuid: string
    token?: string
    pincode?: string
    path?: string
}

export interface IGetSharedLinksRes {
    uuid: string,
    type: string,
    path: string,
    name: string,
    timelive: string,
}

export interface IUpdateDareLinkReq extends Pick<ISharelinkAddReq, "pincode" | "date_to"> {
    uuid: string
}
