import React, {useEffect, useState} from 'react';
import {useGetFilesFromPath} from "../api/filesApi/filesApi";
import {FileTypes} from "../../shared/consts/fileTypes";
import FileItem from "../../shared/ui/FileItem";
import Input from "../../shared/ui/Input";
import Loader from "../../shared/loader";
import {useAppDispatch} from "../../shared/store/redux";
import {v4 as uuidv4} from 'uuid';
import {uploadFile} from "../../shared/store/reducers/ActionCreators";
import {ArrowDownTrayIcon, FolderPlusIcon} from "@heroicons/react/24/outline";
import ToolBar from "../../shared/ui/ToolBar";
import Separator from "../../shared/ui/Separator";
import ButtonToolBar from "../../shared/ui/ButtonToolBar/ui/ButtonToolBar";
import NewFolderModal from "../../widgets/modals/NewFolderModal/NewFolderModal";

const FileList = () => {
    const dispatch = useAppDispatch();
    const [path, setPath] = useState('')
    const [data, {isLoading, requestFn}] = useGetFilesFromPath({path});
    const [filter, setFilter] = useState("")
    const [isVisibleAddFolder, setIsVisibleAddFolder] = useState(false)


    useEffect(() => {
        requestFn({path});
    }, [path]);

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
            if (files.length) {
                files.forEach(file => {
                    dispatch(uploadFile(file, path, uuidv4()))
                })
            }
        }
    }
    const handleAddFolder = () => {
        setIsVisibleAddFolder(true)
    }

    const handleCreateFolder = () => {
        requestFn({path});
    }

    return (
        <div className='w-full h-full flex flex-col space-y-2'>

            <div>
                Путь: {data && data.path}
            </div>
            <div>
                <Input label={'Фильтр'} value={filter} onChange={handleChangeFilter}/>
            </div>
            <ToolBar>
                <ButtonToolBar>
                    <label htmlFor='uploadFileInput'
                           className='cursor-pointer'><ArrowDownTrayIcon className='h-8 w-8'/></label>
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
                            <FileItem name={item} fileType={FileTypes.DIR} key={item} onClick={() => {
                                changePath(item)
                            }}/>
                        ))

                    }
                    {(data && !!data.files.length) &&
                        data.files.filter(item => item.name.includes(filter)).map(item => (
                            <FileItem name={item.name} fileType={FileTypes.FILE} key={item.name}
                                      size={item.size}/>
                        ))
                    }
                </div>
            </div>
            <NewFolderModal
                isVisible={isVisibleAddFolder}
                onClose={()=>setIsVisibleAddFolder(false)}
                onCreate={handleCreateFolder}
            />
        </div>

    );
};

export default FileList;