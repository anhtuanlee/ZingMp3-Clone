import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuPropper from './MenuPropper';

const cx = classNames.bind(styles);

function Menu({ items, children, visible = true, ...props }) {
    return (
        <Tippy
            interactive
            visible={visible}
            offset={[-80, 10]}
            placement="bottom"
            {...props}
            render={(attrs) => {
                return (
                    <div className={cx('wrapper')} {...attrs} tabIndex="-1">
                        <MenuPropper data={items} />
                    </div>
                );
            }}
        >
            <div>{children}</div>
        </Tippy>
    );
}

export default Menu;
