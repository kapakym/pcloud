import React, {useEffect, useState} from 'react';
import {useGetFilesFromPath} from "../api/filesApi/filesApi";
import {FileTypes, IFile} from "../../shared/types/FIles/fileTypes";
import FileItem from "../../shared/ui/FileItem";
import Input from "../../shared/ui/Input";
import Loader from "../../shared/loader";
import {v4 as uuidv4} from 'uuid';
import {CloudArrowDownIcon, FolderPlusIcon} from "@heroicons/react/24/outline";
import ToolBar from "../../shared/ui/ToolBar";
import Separator from "../../shared/ui/Separator";
import ButtonToolBar from "../../shared/ui/ButtonToolBar/ui/ButtonToolBar";
import NewFolderModal from "../../widgets/modals/NewFolderModal/NewFolderModal";
import DeleteFilesModal from "../../widgets/modals/DeleteFilessModal/DeleteFilesModal";
import {useFilesStore} from "../../shared/store/zustand/useFilesStore";
import {PreviewFile} from "../../widgets/PreviewFile/ui/PreviewFile";

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

    const handleCreateFolder = () => {
        requestFn({path});
    }

    const handleDeleteFile = (files: IFile[]) => {
        setDeleteFiles(files);
        setIsVisibleDeleteFiles(true)
    }

    const handleCloseDeleteModal = () => {
        setIsVisibleDeleteFiles(false)
    }

    const handleDelete = () => {
        requestFn({path});
    }

    const handleDownloadFiles = (files: IFile[]) => {
        downLoadFile(files[0], path, uuidv4(), 'disk')
    }

    const previewHandler = async (files: IFile[]) => {
        await downLoadFile(files[0], path, uuidv4(), 'preview')
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
                Путь: {data && data.path}
            </div>
            <div>
                <Input label={'Фильтр'} value={filter} onChange={handleChangeFilter}/>
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
            </ToolBar>
            <div className='w-full overflow-auto '>
                <div className='grid grid-cols-1'>
                    <FileItem name={'..'} fileType={FileTypes.UP_DIR} onClick={() => {
                        upFolder()
                    }}/>
                    {isLoading && <Loader/>}
                    {(data && !!data.folders.length) &&
                        data.folders.filter(item => item.includes(filter)).map(item => (
                            <FileItem
                                name={item}
                                fileType={FileTypes.DIR}
                                key={item}
                                onClick={() => {
                                    changePath(item)
                                }}
                                onDelete={handleDeleteFile}
                                onDownload={handleDownloadFiles}
                                isDownload={!!downloadFiles.find(findItem => findItem.name === item)}
                            />
                        ))

                    }
                    {(data && !!data.files.length) &&
                        data.files.filter(item => item.name.includes(filter)).map(item => (
                            <FileItem name={item.name}
                                      fileType={FileTypes.FILE}
                                      key={item.name}
                                      size={item.size}
                                      onDelete={handleDeleteFile}
                                      onDownload={handleDownloadFiles}
                                      isDownload={!!downloadFiles.find(findItem => findItem?.name === item.name)}
                                      onPreview={previewHandler}
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
            <DeleteFilesModal
                isVisible={isVisibleDeleteFiles}
                files={deleteFiles}
                onClose={handleCloseDeleteModal}
                onDelete={handleDelete}
            />
            <PreviewFile isVisible={visiblePreviewModal} onClose={() => setVisiblePreviewModal(false)}/>
        </div>

    );
};

export default FileList;