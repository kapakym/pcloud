import React, {HTMLAttributes} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const ToolBar = ({children}: Props) => {
    return (
        <div className=' border-[1px] border-solid rounded-xl border-app-border p-2 drop-shadow-xl flex space-x-2'>
            {children}
        </div>
    );
};

export default ToolBar;