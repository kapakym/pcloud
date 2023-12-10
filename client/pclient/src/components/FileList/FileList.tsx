import React, {useEffect, useState} from 'react';
import {useGetFilesFromPath} from "../../api/filesApi";

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
            <div className='w-full  overflow-auto border-2 border-b-amber-950'>
                {(data && !!data.folders.length) &&
                    data.folders.map(item=>(<div>
                        {item}
                    </div>))
                }
            </div>
            <div className='w-full  overflow-auto border-2 border-b-amber-950'>
                {(data && !!data.files.length) &&
                    data.files.map(item=>(<div>
                        {item}
                    </div>))
                }
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