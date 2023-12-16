import React from 'react';
import LeftBar from "../widgets/LeftBar/ui/LeftBar";
import Header from "../widgets/Header/ui/Header";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {mainRoutes} from "./routes/routes";

function App() {
    const routes = createBrowserRouter(mainRoutes)
    return (
        <div className="w-[100%] h-[100vh] border-2 border-red-500 flex">
            <div className='flex flex-col w-full h-full'>
                <Header/>
                <div className='flex h-full'>
                    {/*<LeftBar/>*/}
                    <div className='h-full w-full border-2 border-amber-400'>
                        <RouterProvider router={routes}/>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default App;
