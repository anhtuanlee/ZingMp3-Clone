import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);
function MenuPropper({ data = [] }) {
    const [currentItem, setCurrentItem] = useState([{ data: data }]);
    const lastItemMenu = currentItem[currentItem.length - 1];


    const resultSetting = lastItemMenu.data.map((item, index) => {
        const children = item.children;
        const isChildren = !!children;
        const handleLevel = () => {
            if (isChildren) {
                setCurrentItem((prev) => [...prev, children]);
            }
        };
        return (
            <MenuItem
                key={index}
                data={item}
                nestest={item.children ? item.children : []}
                onClick={handleLevel}
            />
        );
    });
    return <ul className={cx('menu_items')}>{resultSetting}</ul>;
}

export default MenuPropper;
