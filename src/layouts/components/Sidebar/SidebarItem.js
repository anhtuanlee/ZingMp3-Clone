import classNames from 'classnames/bind';
import Button from '../../../components/Button';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);
function SidebarItem({ data, isActive, onClick }) {
    // nhận isActive để xác định xem giá trị đó có trùng với khi Click hay không. Nếu trùng thì nó mới thêm 'active'

    return (
        <li
            className={cx('sidebar_item', isActive ? 'active' : '')}
            onClick={onClick}
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
