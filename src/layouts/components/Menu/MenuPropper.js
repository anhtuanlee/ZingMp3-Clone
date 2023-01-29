import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);
function MenuPropper({ data }) {
    const [currentItem, setCurrentItem] = useState([{ data: data }]);

    const lastItemMenu = currentItem[currentItem.length - 1];

    const resultSetting = lastItemMenu.data.map((item, index) => {
        const children = item.children;

        if (!!children) {
            console.log(lastItemMenu);
        }
        const handleLevel = () => {
            if (!!children) {
                setCurrentItem(prev => [...prev,children]);
            }
        };
        return <MenuItem key={index} data={item} onClick={handleLevel} />;
    });
    return <ul className={cx('menu_items')}>{resultSetting}</ul>;
}

export default MenuPropper;
