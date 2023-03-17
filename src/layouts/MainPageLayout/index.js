import classNames from 'classnames/bind';
import Content from '../../components/Content';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './MainPageLayout.module.scss';
const cx = classNames.bind(styles);
function MainPageLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidbar')}>
                <Sidebar />
            </div>
            <div className={cx('main_page')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('content')}>
                    {children}
                    <Content />
                </div>
            </div>
        </div>
    );
}

export default MainPageLayout;
