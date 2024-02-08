import {create} from 'zustand'
import {immer} from "zustand/middleware/immer";
import {INotice, NotificationsState} from "./types/types";


export const useNotifications = create<NotificationsState>()(immer((set) => ({
    notifications: [],

    pushNotification: (notice: INotice) => {
        set(state => {
            state.notifications.push(notice)
        })
    },
    popNotification: () => {
        set(state => {
            state.notifications.pop()
        })
    },
})))