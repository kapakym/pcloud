import React from 'react';
import {useSharedLinksList} from "../../entities/api/sharelinkApi/sharelinkApi";
import {SharedLinksItem} from "../../shared/ui/SharedLinksItem/ui/SharedLinksItem";

export const SharedLinksPage = () => {
    const [data, {}] = useSharedLinksList()
    console.log(data)
    return (
        <div>
            {data &&
                data.map(item => (
                    <SharedLinksItem
                        uuid={item.uuid}
                        type={item.type}
                        path={item.path}
                        name={item.name}
                        timelive={item.timelive}
                    />
                ))
            }
        </div>
    );
};

