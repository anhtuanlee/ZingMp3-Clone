import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import ModalTheme from '../../components/ModalTheme/ModalTheme';
import Header from '../../layouts/components/Header';
import { combinedStatusSelector } from '../../redux/selector';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const {isTheme} = useSelector(combinedStatusSelector);  
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidbar')}>
                <Sidebar />
            </div>
            <div className={cx('main_page')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
            {isTheme &&    <ModalTheme />}
        </div>
    );
}

export default DefaultLayout;
