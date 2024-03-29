import React, {FC, useState} from 'react';
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
        data?: Blob | undefined
    }

}

export const PreviewFile: FC<PreviewFileProps> = ({isVisible, onClose}) => {
    const previewFile = useFilesStore(state => state.previewFile)
    const [text, setText] = useState("")

    const ShowContent = ({content}: ShowContentProps) => {
        const allowImages = ["image/png", "image/jpeg", "image/gif", 'image/svg+xml']
        const allowVideo = ["video/mp4", 'video/quicktime', 'video/x-flv', 'video/3gpp', 'video/x-msvideo', 'video/x-ms-wmv']
        const allowPdf = ['application/pdf']
        const allowText = ['text/plain']
        const allowOffice = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']

        if (allowImages.includes(content.type)) {
            return (
                <img src={content.src} alt="" className='w-auto max-h-[70dvh] object-contain'/>
            )
        }

        if (allowText.includes(content.type)) {
            content.data?.text().then((value)=> {
                setText(value)
            })

            return (
                <div className='w-full text-wrap'>
                    {text}
                </div>
            )
        }

        if (allowVideo.includes(content.type)) {
            return (
                <video src={content.src} className='w-full max-h-[70dvh] object-contain' autoPlay={true} controls={true}/>
            )
        }

        if (allowPdf.includes(content.type)) {
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

