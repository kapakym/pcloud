import React, {useEffect, useState} from 'react';
import {useGetFilesFromPath} from "../api/filesApi/filesApi";
import {FileTypes} from "../../shared/consts/fileTypes";
import FileItem from "../../shared/ui/FileItem";
import Input from "../../shared/ui/Input";
import Loader from "../../shared/loader";
import {useAppDispatch} from "../../shared/store/redux";
import {v4 as uuidv4} from 'uuid';
import {uploadFile} from "../../shared/store/reducers/ActionCreators";

const FileList = () => {
    const dispatch = useAppDispatch();
    const [path, setPath] = useState('')
    const [data, {isLoading, requestFn}] = useGetFilesFromPath({path});
    const [filter, setFilter] = useState("")


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

    return (
        <div className='w-full h-full flex flex-col space-y-2'>
            <div>
                Путь: {data && data.path}
            </div>
            <div>
                <Input label={'Фильтр'} value={filter} onChange={handleChangeFilter}/>
            </div>
            <div className='w-full overflow-auto '>
                <div className='my-2'>
                    <label htmlFor='uploadFileInput'
                           className='border-[2px] border-dotted border-black p-2 cursor-pointer'>Загрузить файл</label>
                    <input multiple onChange={(event) => handleUploadFile(event)} type={'file'} className='hidden'
                           id='uploadFileInput'/>
                </div>
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
                                      size={item.size / 1000000}/>
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default FileList;