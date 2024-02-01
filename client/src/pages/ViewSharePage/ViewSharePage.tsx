import React from 'react';
import {useParams} from "react-router";

const ViewSharePage = () => {
    const {uuid} = useParams()

    return (
        <div>
            <h1>
                Ссылка {uuid}
            </h1>
        </div>
    );
};

export default ViewSharePage;