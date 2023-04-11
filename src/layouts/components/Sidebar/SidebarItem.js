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
