export interface IGetUsersRes {
    "id": number,
    "email": string,
    "approve": boolean,
    "home_folder": string
}

export interface ISetApprove {
    id: number
    approve: boolean
}