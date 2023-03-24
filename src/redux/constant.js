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
                    content: 'Kết hợp tốt trong việc sử dụng dữ liệu và âm thanh',
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
        slug_name_singer: 'g5r-squad',
        title: 'Những Bài Hát Hay Nhất Của G5R',
    },
    {
        src: require('../assets/images/BannerSinger/banner-ho-quang-hieu.jpg'),
        name_singer: 'Hồ Quang Hiếu',
        slug_name_singer: 'ho-quang-hieu',
        title: 'Những Bài Hát Hay Nhất Của Hồ Quang Hiếu',
    },
    {
        src: require('../assets/images/BannerSinger/banner-jack-97.jpg'),
        name_singer: 'Jack 97',
        slug_name_singer: 'jack',
        title: 'Những Bài Hát Hay Nhất Của Jack',
    },
    {
        src: require('../assets/images/BannerSinger/banner-phan-manh-quynh.jpg'),
        name_singer: 'Phan Mạnh Quỳnh',
        slug_name_singer: 'phan-manh-quynh',
        title: 'Những Bài Hát Hay Nhất Của Phan Mạnh Quỳnh',
    },
    {
        src: require('../assets/images/BannerSinger/banner-son-tung-mtp.jpg'),
        name_singer: 'Sơn Tùng MTP',
        slug_name_singer: 'son-tung-m-tp',
        title: 'Những Bài Hát Hay Nhất Của Sơn Tùng MTP',
    },
];
export const BANNER_ALBUM_HOT = [
    {
        src: require('../assets/images/BannerAlbumHot/banner-album-hot-nhac-edm.jpg'),
        slug_category: 'edm',
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
        slug_category: 'nhac-han',
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
        slug_category: 'pop-au-my',
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
        slug_category: 'nhac-tre',
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
        slug_category: 'rap',
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
