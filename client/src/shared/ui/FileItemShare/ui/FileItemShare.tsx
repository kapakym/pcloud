import React from 'react';
import {FileTypes, IFile, KeysFileTypes} from "../../../types/FIles/fileTypes";
import {CloudArrowUpIcon, DocumentIcon, FolderIcon} from "@heroicons/react/24/outline";
import {sizeFormat} from "../../../utils/files";
import {IShareObject} from "../../../../widgets/modals/AddSharelinkModal/types/types";

interface Props {
    name: string;
    fileType: FileTypes
    onClick?: () => void
    size?: number
    onDelete?: (names: IFile[]) => void
    onDownload?: (names: IFile[]) => void
    isDownload?: boolean
    onPreview?: (names: IFile[]) => void
    onShare?: (shareObject: IShareObject) => void
}

const FileItemShare = (
    {
        name,
        fileType,
        onClick,
        size,
        onDownload,
        isDownload,
        onPreview,
    }: Props) => {


    const handleDownload = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        if (onDownload) {
            onDownload([{
                name: name,
                type: Object.keys(FileTypes)[Object.values(FileTypes).indexOf(fileType)] as KeysFileTypes
            }])
        }
    }

    const handlePreview = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault()
        if (onPreview) {
            onPreview([{
                name: name,
                type: Object.keys(FileTypes)[Object.values(FileTypes).indexOf(fileType)] as KeysFileTypes
            }])
        }
    }

    const showDownload = () => isDownload ? (<span className='loaderCircle h-6 w-6'></span>) : (
        <CloudArrowUpIcon onClick={(event) => handleDownload(event)}
                          className='h-6 w-6 cursor-pointer hover:text-white'/>
    )

    return (
        <div
            className='p-2 odd:bg-app-bg-primary justify-between even:bg-app-bg-secondary sm:flex flex hover:bg-gray-500 hover:text-white cursor-pointer'
            onClick={onClick}>
            <div className='flex space-x-2 items-center w-full' onDoubleClick={(e) => handlePreview(e)}>
                <div>
                    {fileType === FileTypes.DIR && <FolderIcon className='h-6 w-6 cursor-pointer hover:text-white'/>}
                    {fileType === FileTypes.FILE && <DocumentIcon className='h-6 w-6 cursor-pointer hover:text-white'/>}
                </div>
                <div className=' break-all  text-ellipsis  overflow-x-auto'>
                    {name}
                </div>
            </div>

            <div className='flex space-x-2 p-1 items-center'>
                <div className='hidden sm:flex space-x-2'>
                    <div>
                        {size && sizeFormat(size)}
                    </div>
                </div>
                <div className='flex space-x-2 min-w-[100px]'>
                    {fileType !== FileTypes.UP_DIR &&
                        <>
                            {fileType === FileTypes.FILE && showDownload()}
                        </>
                    }

                </div>
            </div>


        </div>
    );
};

export default FileItemShare;