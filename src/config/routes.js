import { AccountLayout, NewSongLayout } from '../layouts';
import AccountPage from '../pages/Account/Account';
import Album from '../pages/Album';
import AlbumSinger from '../pages/AlbumSinger';
import Category from '../pages/Category';
import Error from '../pages/Error';
import Following from '../pages/Following';
import Home from '../pages/Home';
import Mv from '../pages/Mv';
import MyPlayer from '../pages/MyPlayer/';
import NewSongs from '../pages/NewSongs';
import Trending from '../pages/Trending';
import Zingchart from '../pages/Zingchart';

const config = {
    home: {
        component: Home,
        path: '/',
    },
    myplayer: {
        component: MyPlayer,
        path: 'my-player',
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
    albumSinger: {
        component: AlbumSinger,
        path: 'album/:nickname',
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
