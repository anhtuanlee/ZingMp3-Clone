import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../../layouts/components/Header';
import Content from '../../components/Content';
import Controls from '../../components/Controls';
import Sidebar from '../components/Sidebar';
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
                    <Content />
                    {children}
                </div>
            </div>
            <div className={cx('control_music')}>
                <Controls />
            </div>
        </div>
    );
}

export default DefaultLayout;