import {create} from 'zustand'
import {immer} from "zustand/middleware/immer";
import {INotice, NotificationsState} from "./types/types";
import {v4 as uuidv4} from "uuid";


export const useNotifications = create<NotificationsState>()(immer((set) => ({
    notifications: [],

    pushNotification: (notice: INotice) => {
        set(state => {
            notice!.id = uuidv4()
            state.notifications.push(notice)
        })
    },
    popNotification: () => {
        set(state => {
            state.notifications.pop()
        })
    },
})))