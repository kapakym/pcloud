import React from 'react';
import Header from "../widgets/Header/ui/Header";
import {Route, Routes} from "react-router-dom";
import {mainRoutes} from "./routes/routes";
import UploadWindow from "../widgets/UploadWindow";

function App() {
    return (
        <div className="w-[100%] h-[100vh] border-2 border-red-500 flex">
            <div className='flex flex-col w-full h-full'>
                <Header/>
                <div className='flex h-full'>
                    {/*<LeftBar/>*/}
                    <div className='h-full w-full border-2 border-amber-400'>
                        <Routes>
                            {!!mainRoutes?.length &&
                                mainRoutes.map(item => (
                                    <Route path={item.path} key={item.path} element={item.element()}/>
                                ))
                            }
                        </Routes>
                    </div>
                </div>
                <UploadWindow/>
            </div>
        </div>
    )
        ;
}

export default App;
