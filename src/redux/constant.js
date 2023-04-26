import images from '../assets';
import Button from '../components/Button';
import {
    Ads,
    Block,
    Category,
    Chart,
    Dieukhoan,
    Discover,
    Following,
    Heart,
    IconsVIP,
    Info,
    LogOut,
    More,
    Mv,
    NewSong,
    Phone,
    Private,
    Quality,
    Radio,
    Star,
    ThemeMusic,
    Upload,
} from '../components/Icons';

// MENU action and button
export const MENU_ACTIONS_RIGHT = [
    {
        icon: Heart,
        title: 'Thêm vào thư viện',
        type: 'like',
    },
    {
        icon: More,
        title: 'Thêm',
        type: 'more',
    },
];
export const MENU_USER_HEADER = [
    {
        title: 'Nâng cấp VIP',
        icon: IconsVIP,
    },
    {
        title: 'Mua code VIP',
        icon: IconsVIP,
    },
    {
        title: 'Tải lên',
        icon: Upload,
    },
    {
        title: 'Đăng Xuất',
        icon: LogOut,
        type: 'logout',
        spederate: true,
    },
];
export const MENU_SETTING_HEADER = [
    {
        title: 'Danh sách chặn',
        icon: Block,
    },
    {
        title: 'Chất lượng nhạc',
        icon: Quality,
        /*         children: {
            data: [
                {
                    title: 'SQ•128',
                    content: 'Giảm sử dụng dữ liệu cho các kết nối chậm hơn',
                },
                {
                    title: 'HQ•320',
                    content: 'Kết hợp tốt trong việc sử dụng dữ liệu và âm thanh',
                },
            ],
        }, */
    },
    {
        title: 'Giao diện',
        icon: ThemeMusic,
        /*   children: {
            data: [
                {
                    title: 'Luôn phát toàn màn hình',
                },
                {
                    title: 'Hiệu ứng',
                },
            ],
        }, */
    },
    {
        title: 'Giới thiệu',
        icon: Info,
        textblur: true,
        spederate: true,
    },
    {
        title: 'Liên hệ',
        icon: Phone,
        textblur: true,
    },
    {
        title: 'Quảng cáo',
        icon: Ads,
        textblur: true,
    },
    {
        title: 'Thỏa thuận sử dụng',
        icon: Dieukhoan,
        textblur: true,
    },
];

// handle Action render
export const renderFeatureRight = (onHandle) => {
    const result = MENU_ACTIONS_RIGHT.map((item, index) => {
        return (
            <Button
                Icons={item.icon}
                key={index}
                extraTitle={item.title}
                circle_hide
                sizes="medium"
                onHandle={() => onHandle(item)}
            />
        );
    });
    return result;
};
export const SIDEBAR_MENU = [
    {
        title: 'Cá nhân',
        icon: Private,
        to: '/my-player',
    },
    {
        title: 'Khám Phá',
        icon: Discover,
        to: '/',
    },
    /* {
        title: '#zingchart',
        icon: Chart,
        to: '/zing-chart',
    }, */
    {
        title: 'Radio',
        icon: Radio,
        to: '/radio',
    },
    /*  {
        title: 'Theo Dõi',
        icon: Following,
        to: '/following',
    }, */
    {
        title: 'Nhạc Mới',
        icon: NewSong,
        spederate: true,
        to: '/new-songs',
    },
    /*  {
        title: 'Thể Loại',
        icon: Category,
        to: '/category',
    }, */
    {
        title: 'Top 100',
        icon: Star,
        to: '/top-100-song',
    },
    /*  {
        title: 'MV',
        icon: Mv,
        to: '/the-loai-video',
    }, */
];
export const BANNER_SLIDERS = [
    {
        banner: images.bannerSlider[0],
        to: 'new-songs',
    },
    {
        banner: images.bannerSlider[1],
        to: '/  ',
    },
    {
        banner: images.bannerSlider[2],
        to: '/top-trending?_filter=kpop',
    },
    {
        banner: images.bannerSlider[3],
        to: '/',
    },
];

// select national trending
export const KPOP_NATIONAL = 'kpop';
export const VPOP_NATIONAL = 'vpop';
export const USUK_NATIONAL = 'usuk';
export const ALL_NATIONAL = 'all';
export const LOBAl = 'lobal';
export const BUTTON_RENDER_SELECT_NATIONAL = [
    {
        title: 'TẤT CẢ',

        type: ALL_NATIONAL,
    },
    {
        title: 'VIỆT NAM',

        type: VPOP_NATIONAL,
    },
    {
        title: 'HÀN QUỐC',

        type: KPOP_NATIONAL,
    },
    {
        title: 'ÂU MỸ',

        type: USUK_NATIONAL,
    },
    {
        title: 'QUỐC TẾ',
        type: LOBAl,
    },
];
// Banner Singer Popular
export const BANNER_SINGER_POPULAR = [
    {
        src: require('../assets/images/BannerSinger/banner-g5-squad.jpg'),
        name_singer: 'G5 Squad',
        slug_banner_singer_popular: 'g5r-squad',
        title: 'Những Bài Hát Hay Nhất Của G5R',
    },
    {
        src: require('../assets/images/BannerSinger/banner-ho-quang-hieu.jpg'),
        name_singer: 'Hồ Quang Hiếu',
        slug_banner_singer_popular: 'ho-quang-hieu',
        title: 'Những Bài Hát Hay Nhất Của Hồ Quang Hiếu',
    },
    {
        src: require('../assets/images/BannerSinger/banner-jack-97.jpg'),
        name_singer: 'Jack 97',
        slug_banner_singer_popular: 'jack',
        title: 'Những Bài Hát Hay Nhất Của Jack',
    },
    {
        src: require('../assets/images/BannerSinger/banner-phan-manh-quynh.jpg'),
        name_singer: 'Phan Mạnh Quỳnh',
        slug_banner_singer_popular: 'phan-manh-quynh',
        title: 'Những Bài Hát Hay Nhất Của Phan Mạnh Quỳnh',
    },
    {
        src: require('../assets/images/BannerSinger/banner-son-tung-mtp.jpg'),
        name_singer: 'Sơn Tùng MTP',
        slug_banner_singer_popular: 'son-tung-m-tp',
        title: 'Những Bài Hát Hay Nhất Của Sơn Tùng MTP',
    },
];

export const BANNER_ALBUM_HOT = [
    {
        src: require('../assets/images/BannerAlbumHot/banner-album-hot-nhac-edm.jpg'),
        slug_banner_album_hot: 'edm',
        title: 'Đỉnh Cao EDM',
        name_data: [
            {
                name_singer: 'Alan Walker',
                slug_name_singer: 'alan-walker-torine',
            },
            {
                name_singer: 'DXRK ダーク',
                slug_name_singer: 'dxrk-ダーク',
            },
        ],
    },
    {
        src: require('../assets/images/BannerAlbumHot/banner-album-hot-nhac-han.jpg'),
        slug_banner_album_hot: 'nhac-han',
        title: 'Những Bài Hát Hay Nhất HÀN "XẺNG"',
        name_data: [
            {
                slug_name_singer: 'bts',
                name_singer: 'BTS',
            },
            {
                slug_name_singer: 'blackpink',
                name_singer: 'BlackPink',
            },
            {
                slug_name_singer: 'treasure',
                name_singer: 'TREASURE',
            },
        ],
    },
    {
        src: require('../assets/images/BannerAlbumHot/banner-album-hot-nhac-pop-au-my.jpg'),
        slug_banner_album_hot: 'pop-au-my',
        title: 'Đỉnh Cao Nhạc Pop, Nghe Như Không Nghe !!!',
        name_data: [
            {
                slug_name_singer: 'sasha-alex-sloan',
                name_singer: 'Sasha Alex',
            },
            {
                slug_name_singer: 'the-kid-laroi-justin-bieber',
                name_singer: 'Justin Bieber',
            },
        ],
    },
    {
        src: require('../assets/images/BannerAlbumHot/banner-album-hot-nhac-tre.jpg'),
        slug_banner_album_hot: 'nhac-tre',
        title: 'Nhạc Trẻ Gây Nghiện',
        name_data: [
            {
                slug_name_singer: 'nal',
                name_singer: 'Nal',
            },
            {
                slug_name_singer: 'khai-dang',
                name_singer: 'Khải Đăng',
            },
        ],
    },
    {
        src: require('../assets/images/BannerAlbumHot/banner-album-hot-rap-viet.jpg'),
        slug_banner_album_hot: 'rap',
        title: 'Cháy Hết Mình Với Những Bản Rap Hay Nhất Mọi Thời Đại',
        name_data: [
            {
                slug_name_singer: 'kidz',
                name_singer: 'KIDZ',
            },
            {
                slug_name_singer: 'b-ray-x-masew-ft-amee',
                name_singer: 'Bray',
            },
        ],
    },
];

// List Theme
export const MENU_THEME_LIST = {
    artist: [
        {
            title: 'Ganyu',
            cardArtist: require('../assets/images/LisTheme/card_artist/card_theme_ganyu.jpg'),
            properties: {
                backgroundImg: require('../assets/images/LisTheme/img-background_ganyu.jpg'),
                colorPrimary: '#1A3570',
                textHover: '#4C7CFF',
                layoutBg: 'tranparent',
                layoutHeaderBg: 'rgba(179, 216, 219, 0.8)',
                playerBg: '#A3D5DC',
                primaryBg: '#D1EDF0',
                textPrimary: '#32323d',
                textSecondary: '#333333b0',
                purplePrimary: '#1966B2',
                newSongLayout: 'tranparent',
                borderPlayer: 'rgba(0,0,0,0.15)',
                backgrondSize: 'cover',
                sidebarPoup: '#cce0e0',
            },
        },
        {
            title: 'Mặc định',
            cardArtist:
                'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/purple.jpg',
            properties: {
                colorPrimary: '#170f23',
                textHover: '#c273ed',
                layoutBg: '#170f23',
                sidebarBg: '#231b2e',
                layoutHeaderBg: 'rgba(23, 15, 35, 0.666)',
                playerBg: '#130c1c',
                primaryBg: '#34224f',
                textPrimary: '#fff',
                textSecondary: 'hsla(0, 0%, 100%, 0.5)',
                purplePrimary: '#9b4de0',
                newSongLayout:
                    'url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.9/static/media/new-release-bg.73d8f976.jpg)',
                borderPlayer: 'hsla(0,0%,100%,0.1)',
                sidebarPoup: '#2a213a',
            },
        },
        {
            title: 'Jack',
            cardArtist: require('../assets/images/LisTheme/card_artist/card_theme_jack.jpg'),
            properties: {
                backgroundImg: require('../assets/images/LisTheme/img-background_jack.jpg'),
                colorPrimary: '#D08011',
                textHover: '#F59D22',
                playerBg: '#4C473E',
                layoutHeaderBg: '#767269cc',
                layoutBg: 'tranparentent',
                primaryBg: '#605C52',
                textPrimary: '#FFFF',
                textSecondary: 'hsla(0,0%,100%,0.5)',
                purplePrimary: '#D08011',
                newSongLayout: 'tranparent',
                borderPlayer: 'rgba(0,0,0,0.05)',
                sidebarPoup: '#604a45',
            },
        },

        {
            title: 'Jennie',
            cardArtist: require('../assets/images/LisTheme/card_artist/card_theme_jennie.jpg'),
            properties: {
                backgroundImg: require('../assets/images/LisTheme/img-background_jennie.jpg'),
                colorPrimary: '#BBB9C4',
                textHover: '#6F1F89',
                layoutBg: 'tranparent',
                layoutHeaderBg: '#bbb9c4cc',
                playerBg: '#C6C4D1',
                primaryBg: '#CAC6DD',
                textPrimary: '#32323d',
                textSecondary: '#696969',
                purplePrimary: '#8919AE',
                newSongLayout: 'tranparent',
                borderPlayer: 'rgba(0,0,0,0.1)',
                sidebarPoup: '#f2f2f2',
            },
        },
        {
            title: 'Jisoo',
            cardArtist: require('../assets/images/LisTheme/card_artist/card_theme_jiiso.jpg'),
            properties: {
                backgroundImg: require('../assets/images/LisTheme/img-background_jisoo.jpg'),
                colorPrimary: '#8D22C3',
                textHover: '#8D22C3',
                layoutBg: 'tranparent',
                layoutHeaderBg: 'rgb(241, 221, 216, 0.8)',
                playerBg: '#F5E6E0',
                primaryBg: '#FFFF',
                textPrimary: '#32323d',
                textSecondary: 'rgba(0,0,0,0.6)',
                purplePrimary: '#8D22C3',
                newSongLayout: 'tranparent',
                borderPlayer: 'rgba(0,0,0,0.15)',
                sidebarPoup: '#f2f2f2',
            },
        },
        {
            title: 'Rose',
            cardArtist: require('../assets/images/LisTheme/card_artist/card_theme_rose.jpg'),
            properties: {
                backgroundImg: require('../assets/images/LisTheme/img-background_rose.jpg'),
                colorPrimary: '#1A3570',
                textHover: '#4C7CFF',
                layoutBg: 'tranparent',
                layoutHeaderBg: '#061c4fcc',
                playerBg: '#061641',
                primaryBg: '#1A3570',
                textPrimary: '#fff',
                textSecondary: 'hsla(0,0%,100%,0.5)',
                purplePrimary: '#3560F5',
                newSongLayout: 'tranparent',
                borderPlayer: 'hsla(0,0%,100%,0.1)',
                sidebarPoup: '#1d2a49',
            },
        },
        {
            title: 'IU',
            cardArtist: require('../assets/images/LisTheme/card_artist/card_theme_iu.jpg'),
            properties: {
                backgroundImg: require('../assets/images/LisTheme/img-background_ui.jpg'),
                colorPrimary: '#EFEDEB',
                textHover: '#AC3E82', 
                layoutBg: 'tranparent',
                layoutHeaderBg: 'rgb(241, 221, 216, 0.8)',
                playerBg: '#F5E6E0',
                primaryBg: '#EFEDEB',
                textPrimary: '#000',
                textSecondary: '#696969',
                purplePrimary: '#C24793',
                newSongLayout: 'tranparent',
                borderPlayer: 'rgba(0,0,0,0.1)',
                sidebarPoup: '#f2f2f2',
            },
        },
        {
            title: 'Lisa',
            cardArtist: require('../assets/images/LisTheme/card_artist/card_theme_lisa.jpg'),
            properties: {
                backgroundImg: require('../assets/images/LisTheme/img-background_lisa.jpg'),
                colorPrimary: '##D14781',
                textHover: '#CC3373',
                layoutBg: 'tranparent',
                layoutHeaderBg: 'rgb(241, 221, 216, 0.8)',
                playerBg: '#F4CBCA',
                primaryBg: '#F9E6E2',
                textPrimary: '#32323d',
                textSecondary: '#696969',
                purplePrimary: '#D14781',
                newSongLayout: 'tranparent',
                borderPlayer: 'rgba(0,0,0,0.1)',
                sidebarPoup: '#fbd3d2',
            },
        },
    ],
};
