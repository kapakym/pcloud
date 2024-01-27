import Main from "../../pages/Main/Main";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";

export const mainRoutes: any[] = [
    {
        element: LoginPage,
        path: '/'
    },
    {
        element: Main,
        path: '/files_list'
    },
    {
        element: RegistrationPage,
        path: '/registration'
    }
]