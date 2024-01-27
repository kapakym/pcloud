import React from 'react';
import Header from "../widgets/Header/ui/Header";
import {Route, Routes} from "react-router-dom";
import {mainRoutes} from "./routes/routes";
import UploadWindow from "../widgets/UploadWindow";

function App() {
    return (
        <div className="w-[100dvw] h-[100dvh]  flex bg-app-bg-primary text-app-text-primary">
            <div className='flex flex-col w-full h-full'>
                <Header/>
                <div className='flex h-[calc(100%-50px)]'>
                    {/*<LeftBar/>*/}
                    <div className='h-full w-full'>
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
