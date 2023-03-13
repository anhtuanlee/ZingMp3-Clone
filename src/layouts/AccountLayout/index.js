import classNames from 'classnames/bind';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './AccountLayout.module.scss';

const cx = classNames.bind(styles);
function AccountLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidbar')}>
                <Sidebar />
            </div>
            <div className={cx('main_page')}>
                <Header styles={cx('header_main_page')} />
                <div>{children}</div>
            </div>
        </div>
    );
}

export default AccountLayout;
