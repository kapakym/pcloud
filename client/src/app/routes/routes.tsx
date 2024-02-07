import Main from "../../pages/Main/Main";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import ViewSharePage from "../../pages/ViewSharePage/ViewSharePage";
import {UsersPage} from "../../pages/UsersPage/UsersPage";

export const mainRoutes: any[] = [
    {
        element: <LoginPage />,
        path: '/'
    },
    {
        element: <Main />,
        path: '/files_list'
    },
    {
        element: <RegistrationPage />,
        path: '/registration'
    },
    {
        element: <ViewSharePage />,
        path: '/viewshare/:uuid',
    },
    {
        element: <UsersPage />,
        path: '/userlist'
    },

]