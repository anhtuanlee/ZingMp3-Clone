import classNames from 'classnames/bind'; 
import Controls from '../components/Controls';
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
                <Header styles={'wrapper_header_account'} />
                <div className={cx('header_main_page')}>
                    <h3>Account</h3>
                    {children}
                </div>
            </div>
            <div className={cx('control_music')}>
                <Controls />
            </div>
        </div>
    );
}

export default AccountLayout;
