import React, {useEffect, useState} from 'react';
import axios from "axios";
import makeRequest from "./hooks/useRequest";
import {log} from "util";
import {useGetFilesFromPath} from "./api/filesApi";

function App() {

    const [data, {isLoading}] = useGetFilesFromPath()

    if (isLoading) return (
        <div>
            Загрузка...
        </div>
    )

    return (

        <div className="App">
            {data && data.length && data?.map((item) => (
                <div key={item}>
                    {item}
                </div>
            ))}
        </div>
    );
}

export default App;
