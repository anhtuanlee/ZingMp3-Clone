import images from '../assets';
import Button from '../components/Button';
import {
    Ads,
    Block, Category,
    Chart, Dieukhoan, Discover,
    Following, Heart,
    IconsVIP,
    Info, LogOut,
    Mic,
    More, Mv,
    NewSong, Phone, Private, Quality, Radio, Star, ThemeMusic,
    Upload
} from '../components/Icons';


// controls
export const CONTROL_PLAY = 'control/play';
export const CONTROL_PAUSE = 'control/pause';
export const CONTROL_NEXT = 'control/next';
export const CONTROL_PREV = 'control/prev';
export const CONTROL_RANDOM = 'control/random';
export const CONTROL_REPEAT = 'control/repeat';
export const CONTROL_LOADING = 'control/loading';
export const CONTROL_VOLUME = 'control/volume';
// feature
export const TIME_DISPLAY = 'times';
export const CURRENT_INDEX = 'current-index';
export const PLAYLIST_SONGS = 'playlist';
export const SONG_CURRENT = 'songcurrent';
export const VOLUME = 'volume';

//sidebar
export const ID_ACTIVE_SIDEBAR = 'id_active_sidebar';

// MENU action and button
export const MENU_ACTIONS_RIGHT = [
    {
        icon: Mic,
        title: 'Phát cùng lời bài hát ',
        type: 'mic',
    },
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
        to: '/logout',
    },
];
export const MENU_SETTING_HEADER = [
    {
        title: 'Danh sách chặn',
        icon: Block,
        type: 'logout',
    },
    {
        title: 'Chất lượng nhạc',
        icon: Quality,
        children: {
            data: [
                {
                    title: 'SQ•128',
                    content: 'Giảm sử dụng dữ liệu cho các kết nối chậm hơn',
                },
                {
                    title: 'HQ•320',
                    content:
                        'Kết hợp tốt trong việc sử dụng dữ liệu và âm thanh',
                },
            ],
        },
    },
    {
        title: 'Giao diện',
        icon: ThemeMusic,
        children: {
            data: [
                {
                    title: 'Luôn phát toàn màn hình',
                },
                {
                    title: 'Hiệu ứng',
                },
            ],
        },
    },
    {
        title: 'Giới thiệu',
        icon: Info,
        textblur: true,
        spederate: true,
        href: 'http://google.com',
    },
    {
        title: 'Liên hệ',
        icon: Phone,
        textblur: true,
        href: 'http://google.com',
    },
    {
        title: 'Quảng cáo',
        icon: Ads,
        textblur: true,
        href: 'http://google.com',
    },
    {
        title: 'Thỏa thuận sử dụng',
        icon: Dieukhoan,
        textblur: true,
        href: 'http://google.com',
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
        to: '/mymusic',
    },
    {
        title: 'Khám Phá',
        icon: Discover,
        to: '/',
    },
    {
        title: '#zingchart',
        icon: Chart,
        to: '/zing-chart',
    },
    {
        title: 'Radio',
        icon: Radio,
        to: '/',
    },
    {
        title: 'Theo Dõi',
        icon: Following,
        to: '/following',
    },
    {
        title: 'Nhạc Mới',
        icon: NewSong,
        spederate: true,
        to: '/new-songs',
    },
    {
        title: 'Thể Loại',
        icon: Category,
        to: '/category',
    },
    {
        title: 'Top 100',
        icon: Star,
        to: '/',
    },
    {
        title: 'MV',
        icon: Mv,
        to: '/the-loai-video',
    },
];
export const BANNER_SLIDERS = [
    {
        banner: images.bannerSlider[0],
        to: 'new-songs',
    },
    {
        banner: images.bannerSlider[1],
        to: '/',
    },
    {
        banner: images.bannerSlider[2],
        to: '/',
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
];
 
