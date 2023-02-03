import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Category, Chart,
    Discover, Following, Mv, NewSong, Private, Radio, Star
} from '../../../components/Icons/Icons';
import styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';

const cx = classNames.bind(styles);

function Sidebar() {
    const SIDEBAR_MENU = [
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
            to: '/radio',
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
            to: '/newupdate',
        },
        {
            title: 'Thể Loại',
            icon: Category,
            to: '/category',
        },
        {
            title: 'Top 100',
            icon: Star,
            to: '/top100',
        },
        {
            title: 'MV',
            icon: Mv,
            to: '/the-loai-video',
        },
    ];
    const [active, setActive] = useState(null);
    const renderMenuMain = SIDEBAR_MENU.map((item, index) => {
        return (
            <SidebarItem
                data={item}
                key={index}
                onClick={() => setActive(index)}
                isActive={index === active} // check index của giá trị hiện tại có bằng với khi click hay không nếu bằng thì trả v
            />
        );
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to='/' className={cx('logo')} />
            </div>
            <ul className={cx('menu_main')}>{renderMenuMain}</ul>
        </div>
    );
}

export default Sidebar;
