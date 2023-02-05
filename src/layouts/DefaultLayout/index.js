import classNames from 'classnames/bind';
import Content from '../../components/Content';
import Header from '../../layouts/components/Header';
import Controls from '../components/Controls';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidbar')}>
                <Sidebar />
            </div>
            <div className={cx('main_page')}>
                <Header />
                <div style={{ marginTop: 70 }}>
                    {children}
                    <Content />
                </div>
            </div>
            <div className={cx('control_music')}>
                <Controls />
            </div>
        </div>
    );
}

export default DefaultLayout;
