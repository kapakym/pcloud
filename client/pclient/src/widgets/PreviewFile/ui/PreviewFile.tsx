import React from 'react';
import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import {useFilesStore} from "../../../shared/store/zustand/useFilesStore";
import {all} from "axios";

export interface PreviewFileProps {
    isVisible: boolean;
    onClose: () => void
}

export interface ShowContentProps {
    content: {
        src: string,
        type: string
    }

}

export const PreviewFile = ({isVisible, onClose}: PreviewFileProps) => {
    const previewFile = useFilesStore(state => state.previewFile)

    const ShowContent = ({content}: ShowContentProps) => {
        const allowImages = ["image/png", "image/jpeg", "image/gif"]
        const allowVideo = ["video/mp4", 'video/quicktime']

        if (allowImages.includes(content.type)) {
            return (
                <img src={content.src} alt=""/>
            )
        }

        if (allowVideo.includes(content.type)) {
            return (
                <video src={content.src} className='w-full h-[60vh]' autoPlay={true} controls={true} />
            )
        }

        return (
            <div>
                Формат файла не поддерживается
            </div>
        )
    }

    return (
        <Modal
            title={`Просмотр файла`}
            height='h-full'
            width='80%'
            isVisible={isVisible}
            onClose={onClose}
            buttons={(
                <>
                    <Button onClick={onClose}>Закрыть</Button>
                </>
            )}
        >
            <div className='flex justify-center items-center'>
                <ShowContent content={previewFile}/>
            </div>
        </Modal>
    );
};

