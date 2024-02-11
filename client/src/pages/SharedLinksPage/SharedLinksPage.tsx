import React, {useState} from 'react';
import {useSharedLinksList} from "../../entities/api/sharelinkApi/sharelinkApi";
import {SharedLinksItem} from "../../shared/ui/SharedLinksItem/ui/SharedLinksItem";
import {FileTypes} from "../../shared/types/FIles/fileTypes";
import {EditShareLinkModal} from "../../widgets/modals/EditShareLinkModal/ui/EditSharelinkModal";
import {DeleteSharedLinkModal} from "../../widgets/modals/DeleteSharedLinkModal/ui/DeleteSharedLinkModal";

export const SharedLinksPage = () => {
    const [data, {requestFn}] = useSharedLinksList()
    const [currentUuid, setCurrentUuid] = useState<string>("")
    const [currentName, setCurrentName] = useState<string>("")
    const [visibleModalEdit, setVisibleModalEdit] = useState(false)
    const [visibleModalDelete, setVisibleModalDelete] = useState(false)

    const handleEditLink = (uuid: string) => {
        setCurrentUuid(uuid);
        setVisibleModalEdit(true)
    }

    const handleDelete = (uuid: string, name: string) => {
        setCurrentUuid(uuid)
        setCurrentName(name)
        setVisibleModalDelete(true)
    }

    const handleCloseDelete = () => {
        setVisibleModalDelete(false)
        requestFn({})
    }


    return (
        <div>
            <div className='grid-cols-5 grid items-center bg-app-button-primary p-2'>
                <div>Имя</div>
                <div>Годен до</div>
                <div>Тип</div>
                <div>Путь</div>
                <div>Инструменты</div>


            </div>
            {data &&
                data.map(item => (
                    <SharedLinksItem
                        key={item.uuid}
                        uuid={item.uuid}
                        type={item.type as keyof typeof FileTypes}
                        path={item.path}
                        name={item.name}
                        timeLive={item.timelive}
                        onEdit={handleEditLink}
                        onDelete={handleDelete}

                    />
                ))
            }
            <EditShareLinkModal
                isVisible={visibleModalEdit}
                uuid={currentUuid}
                onClose={() => setVisibleModalEdit(false)}
            />

            <DeleteSharedLinkModal
                isVisible={visibleModalDelete}
                uuid={currentUuid}
                name={currentName}
                onClose={handleCloseDelete}
            />

        </div>
    );
};

