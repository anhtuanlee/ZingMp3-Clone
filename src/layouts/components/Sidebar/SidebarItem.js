import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Button from '../../../components/Button';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function SidebarItem({ data, onClick, isActive, dataset, isTablet }) {  
    return (
        <li
            className={cx('sidebar_item', isActive ? 'isActive' : '')}
            onClick={onClick}
            data-index={dataset}
        >
            <Button
                Icons={data.icon}
                title={data.title}
                to={data.to}
                spederate={data.spederate}
            >
                {!isTablet && data.title}
            </Button>
        </li>
    );
}

export default SidebarItem;

SidebarItem.propTypes = {
    data : PropTypes.object,
    onClick : PropTypes.func,
    isActive : PropTypes.bool,
    dataset : PropTypes.number,
    isTablet : PropTypes.bool,
};
