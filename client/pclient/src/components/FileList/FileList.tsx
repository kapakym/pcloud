import React, {useEffect, useState} from 'react';
import {useGetFilesFromPath} from "../../api/filesApi";
import FileItem from "./FileItem";
import {FileTypes} from "./consts/fileTypes";

const FileList = () => {
    const [path, setPath] = useState('')
    const [data, {isLoading, requestFn}] = useGetFilesFromPath({path});

    useEffect(() => {
        requestFn();
    }, [path]);


    const handleChangePath = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setPath(event.target.value)
    }


    return (
        <div className='w-full h-full flex flex-col'>
            <input value={path} onChange={handleChangePath}/>
            <div>
                Путь: {data && data.path}
            </div>
            <div className='w-full overflow-auto border-2 border-b-amber-950'>
                <div className='grid grid-cols-1 border-2 border-gray-700  '>
                    {(data && !!data.folders.length) &&
                        data.folders.map(item => (
                            <FileItem name={item} fileType={FileTypes.DIR} key={item} />
                        ))

                    }
                    {(data && !!data.files.length) &&
                        data.files.map(item => (
                            <FileItem name={item} fileType={FileTypes.FILE} key={item} />
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