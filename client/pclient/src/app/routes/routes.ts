import {RouteObject} from "react-router-dom";
import Main from "../../pages/Main/Main";

export const mainRoutes: RouteObject[] = [
    {
        element: Main(),
        path: '/'
    }
]