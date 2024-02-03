import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router";
import {useSharelink} from "../../entities/api/sharelinkApi/sharelinkApi";
import {PinCodeModal} from "../../widgets/modals/PinCodeModal/PinCodeModal";
import {FileTypes} from "../../shared/types/FIles/fileTypes";
import Loader from "../../shared/loader";
import FileItemShare from "../../shared/ui/FileItemShare";

const ViewSharePage = () => {
    const {uuid} = useParams()
    const [data, {requestFn, errorRes, isLoading}] = useSharelink()
    const [visiblePinCodeModal, setVisiblePinCodeModal] = useState(false)
    const [labelError, setLabelError] = useState('')
    const [textError, setTextError] = useState('')
    const [token, setToken] = useState("")
    const [filter, setFilter] = useState("")
    const [path, setPath] = useState("")

    useEffect(() => {
        if (errorRes) {
            const errorState = errorRes.response.data

            if ('detail' in errorState) {
                if (errorState.detail === 'NEED_PINCODE') {
                    setVisiblePinCodeModal(true)
                }
                if (errorState.detail === 'BAD_PINCODE') {
                    setLabelError(errorState.message)
                }
            } else {
                setTextError(errorState.message)
            }
        }
    }, [errorRes]);

    useEffect(() => {
        if (uuid) {
            requestFn({uuid, token})
        }
    }, [uuid]);

    useEffect(() => {
        if (data) {
            if (data.token) {
                setToken(data.token);
                setVisiblePinCodeModal(false);
            }
        }
    }, [data]);

    useEffect(() => {
        console.log(path)
        if (uuid && token) {
            requestFn({uuid, token, path})
        }
    }, [path]);

    const handleClose = () => {
        setVisiblePinCodeModal(false)
    }

    const handlePincode = (code:string) => {
        if (uuid) {
            requestFn({uuid, pincode: code})
        }
    }

    const getMemoFolderList = useMemo(() => {
        if (data?.folders) {
            console.log(data)
            return data.folders.filter(item => item.includes(filter))
        }
        return []
    }, [filter, data])

    const getMemoFilesList = useMemo(() => {
        if (data?.files) {
            console.log(data)
            return data.files.filter(item => item.name.includes(filter))
        }
        return []
    }, [filter, data])

    const upFolder = () => {
        const back = path.split('/')
        if (back?.length < 2) return
        back.length--
        const prevPath = back.join('/')
        setPath(prevPath)
    }

    const changePath = (folder: string) => {
        setPath(prevState => prevState + '/' + folder)
    }

    if (textError) {
        return (<div className='flex w-full h-full justify-center items-center text-5xl'>
            <div>
                {textError}

            </div>
        </div>)
    }

    return (
        <div>
            <div className='w-full overflow-auto '>
                <div className='grid grid-cols-1'>
                    <FileItemShare name={'..'} fileType={FileTypes.UP_DIR} onClick={() => {
                        upFolder()
                    }}/>
                    {isLoading && <Loader/>}
                    {(data && !!data.folders.length) &&
                        getMemoFolderList.map(item => (
                            <FileItemShare
                                name={item}
                                fileType={FileTypes.DIR}
                                key={item}
                                onClick={() => {
                                    changePath(item)
                                }}
                            />
                        ))

                    }
                    {(data && !!data.files.length) &&
                        getMemoFilesList.map(item => (
                            <FileItemShare name={item.name}
                                      fileType={FileTypes.FILE}
                                      key={item.name}
                                      size={item.size}
                                      // onDownload={handleDownloadFiles}
                                      // isDownload={!!downloadFiles.find(findItem => findItem?.name === item.name)}
                                      // onPreview={previewHandler}
                            />
                        ))
                    }
                </div>
            </div>
            <PinCodeModal
                isVisible={visiblePinCodeModal}
                onClose={handleClose}
                onPincode={handlePincode}
                errorLabel={labelError}
            />
        </div>
    );
};

export default ViewSharePage;