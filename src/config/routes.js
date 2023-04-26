import Mv from '../pages/Mv';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Album from '../pages/Album';
import NewSongs from '../pages/NewSongs';
import Trending from '../pages/Trending';
import Category from '../pages/Category';
import Zingchart from '../pages/Zingchart';
import MyPlayer from '../pages/MyPlayer/';/* 
import Following from '../pages/Following'; */
import Top100 from '../pages/Top100/Top100';
import AlbumSinger from '../pages/AlbumSinger';
import AccountPage from '../pages/Account/Account';
import { AccountLayout, NewSongLayout } from '../layouts';
import ArtistBanner from '../pages/ArtistBanner/ArtistBanner';
import Radio from '../pages/Radio/Radio';

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
    radio: {
        component: Radio,
        path: 'radio',
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
    artistlibrary: {
        component: ArtistBanner,
        path: 'my-player/artist',
    },
    top100: {
        component:  Top100,
        path: 'top-100-song',
    },
    errorpage: {
        component: Error,
        path: '*',
    },
};
export default config;
