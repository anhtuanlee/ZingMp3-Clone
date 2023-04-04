import classNames from 'classnames/bind';
import Button from '../../../components/Button';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);
function SidebarItem({ data, onClick, isActive, dataset }) {
    return (
        <li
            className={cx('sidebar_item', isActive ? 'isActive' : '')}
            onClick={onClick}
            data-index={dataset}
        >
            <Button
                LeftIcons={data.icon}
                title={data.title}
                to={data.to}
                spederate={data.spederate}
            >
                {data.title}
            </Button>
        </li>
    );
}

export default SidebarItem;
