import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SIDEBAR_MENU } from '../../../redux/constant';
import { combinedStatusSelector } from '../../../redux/selector';
import { sidebarSlice } from '../../../redux/sliceReducer';
import styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';
import Media from 'react-media';

const cx = classNames.bind(styles);

function Sidebar() {
    const dispatch = useDispatch();
    const { idActive } = useSelector(combinedStatusSelector);

    const RenderMenuMain = ({ isTablet }) => {
        const result = SIDEBAR_MENU.map((item, index) => {
            const handleClickActive = (e, index) => {
                if (
                    idActive === index &&
                    e.currentTarget.dataset.index !== index.toString()
                ) {
                    dispatch(sidebarSlice.actions.setIdSidebarActive(null));
                    // if lastEl active will off when nextEl active
                } else {
                    dispatch(sidebarSlice.actions.setIdSidebarActive(index));
                }
                localStorage.setItem('idActiveSidebar', JSON.stringify(index));
            };
            return (
                <SidebarItem
                    data={item}
                    key={index}
                    dataset={index}
                    isActive={index === idActive ? true : false} // check isActive ?
                    onClick={(e) => handleClickActive(e, index)}
                    isTablet={isTablet}
                />
            );
        });
        return result;
    };

    return (
        <Media query="(min-width:1130px)">
            {(matches) => {
                return matches ? (
                    <div className={cx('wrapper')}>
                        <div className={cx('inner')}>
                            <Link to="/" className={cx('logo')} />
                        </div>
                        <ul className={cx('menu_main')}>
                            <RenderMenuMain />
                        </ul>
                    </div>
                ) : (
                    <div className={cx('wrapper', 'tablet')}>
                        <div className={cx('inner')}>
                            <Link to="/" className={cx('logo')} />
                        </div>
                        <ul className={cx('menu_main')}>
                            <RenderMenuMain isTablet={true} />
                        </ul>
                    </div>
                );
            }}
        </Media>
    );
}

export default Sidebar;
