import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '../../../components/Button/Button';
import {
    Ads,
    Block,
    ButtonTheme,
    Dieukhoan,
    DowloadIcon,
    IconsVIP,
    Info,
    LogOut,
    Phone,
    Quality,
    Setting,
    ThemeMusic,
    Upload,
} from '../../../components/Icons';
import Image from '../../../components/Image';
import Search from '../../../components/Search';
import Menu from '../Menu';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {
    const MENU_USER = [
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
            spederate: true,
            to: '/logout',
        },
    ];
    const MENU_SETTING = [
        {
            title: 'Danh sách chặn',
            icon: Block,
        },
        {
            title: 'Chất lượng nhạc',
            icon: Quality,
            children: {
                data: [
                    {
                        title: 'SQ•128',
                        content:
                            'Giảm sử dụng dữ liệu cho các kết nối chậm hơn',
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
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('button_controls_left')}>
                    <div>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={cx('icon-arrow-prev')}
                        />
                    </div>
                    <div>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className={cx('icon-arrow-next')}
                        />
                    </div>
                    <Search />
                </div>
                <div className={cx('button_controls_right')}>
                    <Button primary LeftIcons={DowloadIcon} sizes="normal">
                        Dowload
                    </Button>
                    <Button circle Icons={ButtonTheme} />

                    <Button circle Icons={IconsVIP} />

                    <Menu items={MENU_SETTING}>
                        <Button circle Icons={Setting} />
                    </Menu>

                    <Menu items={MENU_USER} visible={false}>
                        <Image
                            className={cx('avatar')}
                            src="https://2.bp.blogspot.com/-gnXUMwRHkaI/WE1VCAktNhI/AAAAAAAAjfs/CZk6jUipKXgvOKc821Rnz-fwXT0QhLEuACEw/s1600/15085502_591915637681021_5420424684372040797_n.jpg"
                        />
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
