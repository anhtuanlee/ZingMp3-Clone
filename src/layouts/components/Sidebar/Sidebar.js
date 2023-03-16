import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { activeSidebar } from '../../../redux/actions';
import { SIDEBAR_MENU } from '../../../redux/constant';
import { idActiveSidebarSelector } from '../../../redux/selector';
import styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';

const cx = classNames.bind(styles);

function Sidebar() {
    const dispatch = useDispatch();
    const _idActiveSidebar = useSelector(idActiveSidebarSelector);
    const renderMenuMain = SIDEBAR_MENU.map((item, index) => {
        const handleClickActive = (e, index) => {
            if (
                _idActiveSidebar === index &&
                e.currentTarget.dataset.index !== index.toString()
            ) {
                dispatch(activeSidebar(null));
                // if lastEl active will off when nextEl active
            } else {
                dispatch(activeSidebar(index));
            }
            localStorage.setItem('idActiveSidebar', JSON.stringify(index));
        };
        return (
            <SidebarItem
                data={item}
                key={index}
                dataset={index}
                isActive={index === _idActiveSidebar ? true : false} // check isActive ?
                onClick={(e) => handleClickActive(e, index)}
            />
        );
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo')} />
            </div>
            <ul className={cx('menu_main')}>{renderMenuMain}</ul>
        </div>
    );
}

export default Sidebar;
