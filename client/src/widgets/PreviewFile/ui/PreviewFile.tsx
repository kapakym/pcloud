import React, {FC} from 'react';
import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import {useFilesStore} from "../../../shared/store/useFileStore/useFilesStore";

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

export const PreviewFile: FC<PreviewFileProps> = ({isVisible, onClose}) => {
    const previewFile = useFilesStore(state => state.previewFile)

    const ShowContent = ({content}: ShowContentProps) => {
        const allowImages = ["image/png", "image/jpeg", "image/gif"]
        const allowVideo = ["video/mp4", 'video/quicktime']
        const allowPdf = ['application/pdf']

        if (allowImages.includes(content.type)) {
            return (
                <img src={content.src} alt="" className='w-auto max-h-[70dvh] object-contain'/>
            )
        }

        if (allowVideo.includes(content.type)) {
            return (
                <video src={content.src} className='w-full max-h-[70dvh] object-contain' autoPlay={true} controls={true}/>
            )
        }

        if (allowPdf.includes(content.type)) {
            console.log(content)
            window.open(content.src)

            return (<div>
                PDF - файл открыт в новой вкладке
            </div>)
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
            height='h-auto'
            width='w-[90%] sm:w-auto'
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

