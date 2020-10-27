import Admin from "../Admin/Component/Admin";
import Home from "../Home/Component/home";
import AnserSheet from "../User/Component/anserSheet";
import SuccessComponent from "../User/Component/success";
import User from "../User/Component/user";


export interface RouteInterface {
    path: string;
    component: any;
}

export const ROUTES: RouteInterface[] = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/admin',
        component: Admin
    },
    {
        path: '/user',
        component: User
    },
    {
        path: '/answer/:id',
        component: AnserSheet
    },
    {
        path: '/done',
        component: SuccessComponent
    }
];
