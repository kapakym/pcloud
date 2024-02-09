export enum NoticeType {
    PRIMARY = 'bg-app-button-primary',
    DANGER = 'bg-app-bg-danger'
}

export interface INotice {
    message: string
    type: NoticeType
    id?: string
}

export interface NotificationsState {
    notifications: INotice[]
    pushNotification: (notice: INotice) => void
    popNotification: () => void
}