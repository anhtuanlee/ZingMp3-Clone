import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Propose.module.scss';

const cx = classNames.bind(styles);
function AccountPropose({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user_account')}>
                <img
                    className={cx('avatar')}
                    src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                />
                <div className={cx('user_info')}>
                    <div className={cx('name_singer')}>Bé Dung</div>
                    <div className={cx('sub_title')}>
                        Nhạc sĩ
                        <FontAwesomeIcon className={cx('icon_dot')} icon={faCircle} />
                        <span className={cx('follower')}> 20k quan tâm </span>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}

export default AccountPropose;
