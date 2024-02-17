import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router";
import {useSharelink} from "../../entities/api/sharelinkApi/sharelinkApi";
import {PinCodeModal} from "../../widgets/modals/PinCodeModal/PinCodeModal";
import {FileTypes, IFile} from "../../shared/types/FIles/fileTypes";
import Loader from "../../shared/loader";
import FileItemShare from "../../shared/ui/FileItemShare";
import {v4 as uuidv4} from "uuid";
import {useFilesStore} from "../../shared/store/useFileStore/useFilesStore";
import {PreviewFile} from "../../widgets/PreviewFile/ui/PreviewFile";

const ViewSharePage = () => {
    const {uuid} = useParams()
    const [data, {requestFn, errorRes, isLoading}] = useSharelink()
    const [visiblePinCodeModal, setVisiblePinCodeModal] = useState(false)
    const [labelError, setLabelError] = useState('')
    const [textError, setTextError] = useState('')
    const [token, setToken] = useState("")
    const [filter, setFilter] = useState("")
    const [path, setPath] = useState("")
    const downloadFiles = useFilesStore(state => state.downloadFiles)
    const downLoadFile = useFilesStore(state => state.downloadFileAction)
    const [visiblePreviewModal, setVisiblePreviewModal] = useState(false)

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

    const previewHandler = async (files: IFile[]) => {
        await downLoadFile({
            file: files[0],
            path,
            uuid: uuidv4(),
            mode: 'preview',
            source: 'share',
            token,
            uuidShare: uuid
        })
        setVisiblePreviewModal(true)
    }
    const handleClose = () => {
        setVisiblePinCodeModal(false)
    }

    const handlePincode = (code: string) => {
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

    const handleDownloadFiles = async (files: IFile[]) => {
        await downLoadFile({
            file: files[0],
            path,
            uuid: uuidv4(),
            mode: 'disk',
            source: 'share',
            token,
            uuidShare: uuid
        })
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
                                           onDownload={handleDownloadFiles}
                                           onPreview={previewHandler}
                                           progressDownload={downloadFiles.find(findItem => findItem?.name === item.name)?.progress}
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
            {visiblePreviewModal &&
                <PreviewFile
                    isVisible={visiblePreviewModal}
                    onClose={() => setVisiblePreviewModal(false)}
                />
            }
        </div>
    );
};

export default ViewSharePage;