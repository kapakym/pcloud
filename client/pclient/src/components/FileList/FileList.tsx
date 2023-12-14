import React, {useEffect, useState} from 'react';
import {useGetFilesFromPath} from "../../api/filesApi";
import FileItem from "./FileItem";
import {FileTypes} from "./consts/fileTypes";

const FileList = () => {
    const [path, setPath] = useState('')
    const [data, {isLoading, requestFn}] = useGetFilesFromPath({path});

    useEffect(() => {
        requestFn({path});
    }, [path]);



    const changePath = (folder: string) => {
        setPath(prevState => prevState + '/' + folder)
    }

    const upFolder = () => {
        const back = path.split('/')
        if (back?.length<2) return
        back.length--
        const prevPath = back.join('/')
        setPath(prevPath)
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <div>
                Путь: {data && data.path}
            </div>
            <div className='w-full overflow-auto border-2 border-b-amber-950'>
                <div className='grid grid-cols-1 border-2 border-gray-700  '>
                    <FileItem name={'..'} fileType={FileTypes.DIR} onClick={() => {
                        upFolder()
                    }}/>
                    {(data && !!data.folders.length) &&
                        data.folders.map(item => (
                            <FileItem name={item} fileType={FileTypes.DIR} key={item} onClick={() => {
                                changePath(item)
                            }}/>
                        ))

                    }
                    {(data && !!data.files.length) &&
                        data.files.map(item => (
                            <FileItem name={item} fileType={FileTypes.FILE} key={item}/>
                        ))
                    }
                </div>

            </div>


            {isLoading &&
                <div>
                    Загрузка...
                </div>
            }
        </div>

    );
};

export default FileList;