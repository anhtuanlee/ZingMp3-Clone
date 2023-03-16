import classNames from 'classnames/bind';
import Content from '../../components/Content';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import styles from './NewSongLayout.module.scss';
const cx = classNames.bind(styles);
function NewSongLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidbar')}>
                <Sidebar />
            </div>
            <div className={cx('main_page')}>
                <div className={cx('box-1', 'box')}></div>
                <div className={cx('box-2', 'box')}></div>
                <div className={cx('box-3', 'box')}></div>
                <div>
                    <Header styles={cx('header')} />
                </div>
                <div className={cx('content')}>
                    {children}
                    <Content />
                </div>
            </div>
        </div>
    );
}

export default NewSongLayout;
