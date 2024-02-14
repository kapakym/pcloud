import React from 'react';
import {FileTypes, IFile, KeysFileTypes} from "../../../types/FIles/fileTypes";
import {CloudArrowUpIcon, DocumentIcon, EyeIcon, FolderIcon, ShareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {sizeFormat} from "../../../utils/files";
import {IShareObject} from "../../../../widgets/modals/AddSharelinkModal/types/types";

interface Props {
    name: string;
    fileType: FileTypes
    onClick?: () => void
    size?: number
    onDelete?: (names: IFile[]) => void
    onDownload?: (names: IFile[]) => void
    onPreview?: (names: IFile[]) => void
    onShare?: (shareObject: IShareObject) => void
    progressDownload?: number
}

const FileItem = (
    {
        name,
        fileType,
        onClick,
        size,
        onDelete,
        onDownload,
        onPreview,
        onShare,
        progressDownload
    }: Props) => {

    const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation()
        if (onDelete) {
            onDelete([{
                name: name,
                type: Object.keys(FileTypes)[Object.values(FileTypes).indexOf(fileType)] as KeysFileTypes
            }])
        }
    }

    const handleDownload = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        if (onDownload) {
            onDownload([{
                name: name,
                type: Object.keys(FileTypes)[Object.values(FileTypes).indexOf(fileType)] as KeysFileTypes
            }])
        }
    }

    const handlePreview = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        e.preventDefault()
        if (onPreview) {
            onPreview([{
                name: name,
                type: Object.keys(FileTypes)[Object.values(FileTypes).indexOf(fileType)] as KeysFileTypes
            }])
        }
    }

    const handleShare = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation()
        e.preventDefault()
        console.log(name)
        if (onShare) {
            onShare({
                name,
                type: Object.keys(FileTypes)[Object.values(FileTypes).indexOf(fileType)] as KeysFileTypes
            })
        }
    }

    const showDownload = () => progressDownload ? (<><span className='loaderCircle h-8 w-8'></span>
        <div>{progressDownload.toFixed(1)}%</div>
    </>) : (
        <CloudArrowUpIcon onClick={(event) => handleDownload(event)}
                          className='h-8 w-8 cursor-pointer hover:text-app-bg-primary'/>
    )

    return (
        <div
            className='flex  p-2 odd:bg-app-bg-primary justify-between even:bg-app-bg-secondary  hover:bg-gray-500 hover:text-white cursor-pointer'
            onClick={onClick}>
            <div className='flex space-x-2 items-center w-full'>
                <div>
                    {fileType === FileTypes.DIR && <FolderIcon className='h-6 w-6 cursor-pointer hover:text-white'/>}
                    {fileType === FileTypes.FILE && <DocumentIcon className='h-6 w-6 cursor-pointer hover:text-white'/>}
                </div>
                <div className=' break-all  text-ellipsis  overflow-x-auto'>
                    {name}
                </div>
            </div>

            <div className='flex space-x-2 p-1 items-center justify-end'>
                <div className='hidden sm:flex space-x-2'>
                    <div>
                        {size && sizeFormat(size)}
                    </div>
                </div>
                <div className='flex space-x-2 '>
                    {fileType !== FileTypes.UP_DIR &&
                        <>

                            {fileType === FileTypes.FILE &&
                                <EyeIcon className='h-8 w-8 cursor-pointer hover:text-app-bg-primary'
                                         onClick={(e) => handlePreview(e)}/>
                            }
                            {fileType === FileTypes.FILE && showDownload()}
                            <ShareIcon
                                className='h-8 w-8 cursor-pointer hover:text-app-bg-primary'
                                onClick={(event) => handleShare(event)}
                            />
                            <TrashIcon onClick={(event) => handleDelete(event)}
                                       className='h-8 w-8 cursor-pointer hover:text-app-bg-primary'/>

                        </>

                    }

                </div>
            </div>


        </div>
    );
};

export default FileItem;