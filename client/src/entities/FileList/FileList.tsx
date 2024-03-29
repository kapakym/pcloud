import React, {useEffect, useMemo, useState} from 'react';
import {useGetFilesFromPath} from "../api/filesApi/filesApi";
import {FileTypes, IFile} from "../../shared/types/FIles/fileTypes";
import FileItem from "../../shared/ui/FileItem";
import Input from "../../shared/ui/Input";
import Loader from "../../shared/loader";
import {v4 as uuidv4} from 'uuid';
import {ArrowDownTrayIcon, CloudArrowDownIcon, FolderPlusIcon} from "@heroicons/react/24/outline";
import ToolBar from "../../shared/ui/ToolBar";
import Separator from "../../shared/ui/Separator";
import ButtonToolBar from "../../shared/ui/ButtonToolBar/ui/ButtonToolBar";
import NewFolderModal from "../../widgets/modals/NewFolderModal/NewFolderModal";
import DeleteFilesModal from "../../widgets/modals/DeleteFilessModal/DeleteFilesModal";
import {useFilesStore} from "../../shared/store/useFileStore/useFilesStore";
import {PreviewFile} from "../../widgets/PreviewFile/ui/PreviewFile";
import {AddSharelinkModal} from "../../widgets/modals/AddSharelinkModal/ui/AddSharelinkModal";
import {IShareObject} from "../../widgets/modals/AddSharelinkModal/types/types";

const FileList = () => {
    const [path, setPath] = useState('')
    const [data, {isLoading, requestFn}] = useGetFilesFromPath({path});
    const [filter, setFilter] = useState("")
    const [isVisibleAddFolder, setIsVisibleAddFolder] = useState(false)
    const [isVisibleDeleteFiles, setIsVisibleDeleteFiles] = useState(false)
    const isAllUploaded = useFilesStore(state => state.isAllUploaded)
    const [deleteFiles, setDeleteFiles] = useState<IFile[]>([])
    const downLoadFile = useFilesStore(state => state.downloadFileAction)
    const uploadFile = useFilesStore(state => state.uploadFileActions)
    const downloadFiles = useFilesStore(state => state.downloadFiles)
    const show = useFilesStore(state => state.show)
    const [dragEnter, setDragEnter] = useState(false)
    const [visiblePreviewModal, setVisiblePreviewModal] = useState(false)
    const [visibleSharelinkModal, setVisibleSharelinkModal] = useState(false)
    const [shareObject, setShareObject] = useState<IShareObject>()

    useEffect(() => {
        if (shareObject?.name) {

            setVisibleSharelinkModal(true)
        }
    }, [shareObject]);

    useEffect(() => {
        requestFn({path});
    }, [path]);

    useEffect(() => {
        if (isAllUploaded) {
            requestFn({path});
        }
    }, [isAllUploaded]);


    const changePath = (folder: string) => {
        setPath(prevState => prevState + '/' + folder)
    }

    const upFolder = () => {
        const back = path.split('/')
        if (back?.length < 2) return
        back.length--
        const prevPath = back.join('/')
        setPath(prevPath)
    }

    const handleChangeFilter = (e: React.FormEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value)
    }

    const handleUploadFile = async (event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.files?.length) {
            //@ts-ignore
            const files = [...event.currentTarget.files]
            show()
            if (files.length) {
                files.forEach(file => {
                    uploadFile(file, path, uuidv4())
                })
            }
            requestFn({path});
        }
    }


    const handleAddFolder = () => {
        setIsVisibleAddFolder(true)
    }
    const handleUploads = () => {
        show()
    }
    const handleCreateFolder = () => {
        requestFn({path});
    }

    const handleDeleteFile = (files: IFile[]) => {
        setDeleteFiles(files);
        setIsVisibleDeleteFiles(true)
    }

    const handleCloseDeleteModal = () => {
        setIsVisibleDeleteFiles(false)
        requestFn({path});
    }

    const handleDownloadFiles = async (files: IFile[]) => {
        await downLoadFile({
            file: files[0],
            path,
            uuid: uuidv4(),
            mode: 'disk',
            source: 'default'
        })
    }

    const previewHandler = async (files: IFile[]) => {
        await downLoadFile({
            file: files[0],
            path,
            uuid: uuidv4(),
            mode: 'preview',
            source: 'default'
        })
        setVisiblePreviewModal(true)
    }

    function dragEnterHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dragDropHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        show()
        if (files.length) {
            files.forEach(file => {
                uploadFile(file, path, uuidv4())
            })
        }
        requestFn({path});
        setDragEnter(false)
    }

    const getMemoFolderList = useMemo(() => {
        if (data) {
            return data.folders.filter(item => item.includes(filter))
        }
        return []
    }, [filter, data])

    const getMemoFilesList = useMemo(() => {
        if (data) {
            return data.files.filter(item => item.name.includes(filter))
        }
        return []
    }, [filter, data])

    if (dragEnter) return (
        <div className='w-full h-full flex flex-col space-y-2 justify-center items-center text-5xl '
             onDragEnter={dragEnterHandler}
             onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} onDrop={dragDropHandler}>
            <div>Перетащите файлы сюда</div>
        </div>
    )

    return (
        <div className='w-full h-full flex flex-col space-y-2' onDragEnter={dragEnterHandler}
             onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>

            <div>
                Path: {data && data.path}
            </div>
            <div>
                <Input label={'Filter'} value={filter} onChange={handleChangeFilter}/>
            </div>
            <ToolBar>
                <ButtonToolBar>
                    <label htmlFor='uploadFileInput'
                           className='cursor-pointer'><CloudArrowDownIcon className='h-8 w-8'/></label>
                    <input multiple onChange={(event) => handleUploadFile(event)} type={'file'} className='hidden'
                           id='uploadFileInput'/>
                </ButtonToolBar>
                <ButtonToolBar onClick={handleAddFolder}>
                    <FolderPlusIcon className='h-8 w-8'/>
                </ButtonToolBar>


                <Separator/>
                <ButtonToolBar onClick={handleUploads}>
                    <ArrowDownTrayIcon className='h-8 w-8'/>
                </ButtonToolBar>
            </ToolBar>
            <div className='w-full overflow-auto '>
                <div className='grid grid-cols-1'>
                    <FileItem name={'..'} fileType={FileTypes.UP_DIR} onClick={() => {
                        upFolder()
                    }}/>
                    {isLoading && <Loader/>}
                    {(data && !!data.folders.length) &&
                        getMemoFolderList.map(item => (
                            <FileItem
                                name={item}
                                fileType={FileTypes.DIR}
                                key={item}
                                onClick={() => {
                                    changePath(item)
                                }}
                                onDelete={handleDeleteFile}
                                onDownload={handleDownloadFiles}
                                onShare={setShareObject}
                            />
                        ))

                    }
                    {(data && !!data.files.length) &&
                        getMemoFilesList.map(item => (
                            <FileItem name={item.name}
                                      fileType={FileTypes.FILE}
                                      key={item.name}
                                      size={item.size}
                                      onDelete={handleDeleteFile}
                                      onDownload={handleDownloadFiles}
                                      onPreview={previewHandler}
                                      onShare={setShareObject}
                                      progressDownload={downloadFiles.find(findItem => findItem?.name === item.name)?.progress}
                            />
                        ))
                    }
                </div>
            </div>
            <NewFolderModal
                isVisible={isVisibleAddFolder}
                onClose={() => setIsVisibleAddFolder(false)}
                onCreate={handleCreateFolder}
                path={path}
            />
            {isVisibleDeleteFiles &&
                <DeleteFilesModal
                    isVisible={isVisibleDeleteFiles}
                    files={deleteFiles}
                    onClose={handleCloseDeleteModal}
                />
            }

            {visiblePreviewModal &&
                <PreviewFile
                    isVisible={visiblePreviewModal}
                    onClose={() => setVisiblePreviewModal(false)}
                />
            }

            {(shareObject && visibleSharelinkModal) &&
                <AddSharelinkModal
                    isVisible={visibleSharelinkModal}
                    shareObject={{path, ...shareObject}}
                    onClose={() => setVisibleSharelinkModal(false)}
                />
            }
            <div className='w-full border-[1px] border-app-border rounded-xl p-2'>
                {data &&
                    <div>
                    Items: {data?.folders?.length + data?.files?.length}
                    </div>
                }

            </div>
        </div>

    );
};

export default FileList;