import React from 'react';
import {Notification} from "../../../shared/ui/Notification/ui/Notification";
import {useNotifications} from "../../../shared/store/useNotifications/useNotifications";

export const NotificationBuilder =  () => {

    const notification = useNotifications(state => state.notifications)

    return (
        <div className='fixed bottom-1 right-1 flex flex-col space-y-2'>
            {notification && notification.map((item) => (
                <Notification
                    notice={item}
                    timeOut={2000}
                    key={item.id}
                />
            ))}
        </div>
    );
};

