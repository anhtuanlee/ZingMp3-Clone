import { useLocation } from 'react-router-dom';
import { AccountLayout, NewSongLayout } from '../layouts';
import MainPageLayout from '../layouts/MainPageLayout';
import AccountPage from '../pages/Account/Account';
import Album from '../pages/Album';
import Category from '../pages/Category';
import Error from '../pages/Error';
import Following from '../pages/Following';
import Home from '../pages/Home';
import Mv from '../pages/Mv';
import Mymusic from '../pages/Mymusic';
import NewSongs from '../pages/NewSongs';
import Top100 from '../pages/Top100';
import Trending from '../pages/Trending';
import Zingchart from '../pages/Zingchart';

const config = {
    home: {
        component: Home,
        path: '/',
        layout: MainPageLayout,
    },
    mymusic: {
        component: Mymusic,
        path: 'mymusic',
    },

    account: {
        component: AccountPage,
        path: ':nickname',
        layout: AccountLayout,
    },
    zingchart: {
        component: Zingchart,
        path: 'zing-chart',
    },
    album: {
        component: Album,
        path: ':nickname/album',
    },
    newupdate: {
        component: NewSongs,
        path: 'new-songs',
        layout: NewSongLayout,
    },
    following: {
        component: Following,
        path: 'following',
    },
    category: {
        component: Category,
        path: 'category',
    },
    top100: {
        component: Top100,
        path: 'top100',
    },
    videogenre: {
        component: Mv,
        path: 'the-loai-video',
    },
    trending: {
        component: Trending,
        path: 'top-trending',
    },
    errorpage: {
        component: Error,
        path: '*',
    },
};
export default config;
