import config from '../config/routes';

export const publicRoutes = [];
export const privateRoutes = [
    {
        path: config.home.path,
        component: config.home.component, 
    },
    {
        path: config.myplayer.path,
        component: config.myplayer.component,
    },

    {
        path: config.account.path,
        component: config.account.component,
        layout: config.account.layout,
    },
    {
        path: config.zingchart.path,
        component: config.zingchart.component,
    },
    {
        path: config.album.path,
        component: config.album.component,
    },
    {
        path: config.albumSinger.path,
        component: config.albumSinger.component,
    },
    {
        path: config.newupdate.path,
        component: config.newupdate.component,
        layout: config.newupdate.layout,
    },
    {
        path: config.following.path,
        component: config.following.component,
    },
    {
        path: config.category.path,
        component: config.category.component,
    },

    {
        path: config.videogenre.path,
        component: config.videogenre.component,
    },
    {
        path: config.errorpage.path,
        component: config.errorpage.component,
    },
    {
        path: config.trending.path,
        component: config.trending.component,
    },
];
