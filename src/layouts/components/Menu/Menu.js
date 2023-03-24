import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Menu({
    onHandle = defaultFn,
    items = [],
    children,
    visible = false,
    nestest,
    ...props
}) {
    const [visiblecheck, setVisible] = useState(false); /* 
    const [currentItem, setCurrentItem] = useState([{ data: items }]); */
    const currentItem = [{ data: items }];
    const lastItemMenu = currentItem[currentItem.length - 1];

    const handleClick = () => {
        if (!nestest) {
            setVisible(!visiblecheck);
        }
    };
    const handleClickOutSide = () => {
        setVisible(false);
    };
    //render lists menu
    const listRender = nestest ? nestest : lastItemMenu;

    const resultSetting = listRender.data.map((item, index) => {
        return <MenuItem key={index} data={item} onHandle={onHandle} />;
    });
    const handleResult = (attrs) => {
        return (
            <div className={cx('wrapper')} {...attrs} tabIndex="-1">
                <ul className={cx('menu_items')}>{resultSetting}</ul>
            </div>
        );
    };
    return (
        <Tippy
            interactive
            appendTo={document.body}
            visible={visible || visiblecheck}
            offset={[-80, 10]}
            delay={[1000, 100]}
            zIndex={99999}
            placement="bottom"
            {...props}
            onClickOutside={handleClickOutSide}
            render={handleResult}
        >
            <span onClick={handleClick}>{children}</span>
        </Tippy>
    );
}
Menu.propTypes = {
    onHandle: PropTypes.func,
    items: PropTypes.array,
    children: PropTypes.node,
    visible: PropTypes.bool,
    nestest: PropTypes.object,
};
export default Menu;
