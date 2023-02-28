import classNames from 'classnames/bind';
import { useRef } from 'react';
import Content from '../../components/Content';
import Header from '../../layouts/components/Header';
import Audio from '../components/Audio';
import Controls from '../components/Controls';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const audioRef = useRef();

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
            <div>
                <Audio audioRef={audioRef} />
            </div>
            <div className={cx('control_music')}>
                <Controls audioRef={audioRef} />
            </div>
        </div>
    );
}

export default DefaultLayout;
