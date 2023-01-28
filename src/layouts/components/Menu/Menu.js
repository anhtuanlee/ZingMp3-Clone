import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuPropper from './MenuPropper';
import images from '../../../assets';
import Image from '../../../components/Image';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

function Menu({ children }) {
    return (
        <Tippy
            interactive
            visible
            offset={[-50, 0]}
            placement="bottom-start"
            render={(attrs) => {
                return (
                    <div className={cx('wrapper')} {...attrs} tabIndex="-1">
                        <MenuPropper />
                        
                    </div>
                );
            }}
        >
            <div>{children}</div>
        </Tippy>
    );
}

export default Menu;
