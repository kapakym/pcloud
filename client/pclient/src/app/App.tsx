import React from 'react';
import LeftBar from "../widgets/LeftBar/LeftBar";
import Main from "../pages/Main/Main";

function App() {
    return (
        <div className="w-[100%] h-[100vh] border-2 border-red-500 flex">
            <LeftBar/>
            <Main/>
        </div>
    );
}

export default App;
