import Home from '../pages/Home';
import Mymusic from '../pages/Mymusic';
import NewUpdate from '../pages/NewUpdate';
import Account from '../pages/Account';
import { AccountLayout } from '../layouts';
import Zingchart from '../pages/Zingchart';
import Radio from '../pages/Radio';
import Following from '../pages/Following';
import Category from '../pages/Category';
import Top100 from '../pages/Top100';
import Mv from '../pages/Mv';

const config = {
    home: {
        component: Home,
        path: '/',
    },
    mymusic: {
        component: Mymusic,
        path: '/mymusic',
    },

    account: {
        component: Account,
        path: '/:account',
        layout: AccountLayout,
    },
    zingchart: {
        component: Zingchart,
        path: '/zing-chart',
    },
    radio: {
        component: Radio,
        path: '/radio',
    },
    newupdate: {
        component: NewUpdate,
        path: '/newupdate',
    },
    following: {
        component: Following,
        path: '/following',
    },
    category: {
        component: Category,
        path: '/category',
    },
    top100: {
        component: Top100,
        path: '/top100',
    },
    videogenre: {
        component: Mv,
        path: '/the-loai-video',
    },
};
export default config;
