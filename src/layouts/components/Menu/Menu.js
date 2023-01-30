import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuPropper from './MenuPropper';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Menu({
    items,
    extraTitle,
    children,
    visible = true,

    ...props
}) {
    const [visiblecheck, setVisible] = useState(false);
    const handleClick = () => {
        setVisible(!visiblecheck);
    };
    const handleClickOutSide = () => {
        setVisible(false);
    };
    console.log(items)
    const handleResult = (attrs) => {
        return (
            <div className={cx('wrapper')} {...attrs} tabIndex="-1">
                <MenuPropper data={items} />
            </div>
        );
    };
    return (
        <Tippy
            interactive
            visible={visiblecheck}
            onClickOutside={handleClickOutSide}
            offset={[-80, 10]}
            delay={[1000, 100]}
            placement="bottom"
            {...props}
            render={handleResult}
        >
            <span onClick={handleClick}>{children}</span>
        </Tippy>
    );
}

export default Menu;
