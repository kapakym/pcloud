import React, {useState} from 'react';

const LeftBar = () => {
    const [isShow, setIsShow] = useState(false)
    console.log('render left bar')
    return (
        // <div className={`w-[${isShow ? '25%' : '15%'}] h-[100%] flex flex-col transform-[width] duration-500 border-2 border-blue-300`}>
        <div className={`p-2 ${isShow ? 'w-[35%]' : 'w-[15%]' }  h-[100%] flex flex-col ease-in-out duration-500 border-2 transition-all border-blue-300`}>
        {/*<div className={`p-2 w-[15%] hover:w-[30%]  h-[100%] flex flex-col ease-in-out duration-500 border-2 transition-all border-blue-300`}>*/}
            <button onClick={() => setIsShow(prevState => !prevState)}>Menu</button>
            Left
        </div>
    );
};

export default LeftBar;