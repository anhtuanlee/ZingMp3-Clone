import Home from '../pages/Home';
import Mymusic from '../pages/Mymusic';
import NewUpdate from '../pages/NewUpdate/NewUpdate';

export const publicRoutes = [];
export const privateRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/mymusic',
        component: Mymusic,
    },
    {
        path: '/moi-cap-nhat', 
        component: NewUpdate
    },
];
