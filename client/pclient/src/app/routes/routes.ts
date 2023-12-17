import {RouteObject} from "react-router-dom";
import Main from "../../pages/Main/Main";
import LoginPage from "../../pages/LoginPage";

export const mainRoutes: RouteObject[] = [
    {
        element: Main(),
        path: '/'
    },
    {
        element: LoginPage(),
        path: '/login'
    }
]