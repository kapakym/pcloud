import Main from "../../pages/Main/Main";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";

export const mainRoutes: any[] = [
    {
        element: Main,
        path: '/'
    },
    {
        element: LoginPage,
        path: '/login'
    },
    {
        element: RegistrationPage,
        path: '/registration'
    }
]