import classNames from 'classnames/bind';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './AccountLayout.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);
function AccountLayout({ children }) {
    const ref = useRef();
    const [isScroll, setScroll] = useState();

    //handle Scroll in main page
    useEffect(() => {
        const instance = ref.current;
        const handleScroll = () => {
            setScroll(instance.scrollTop);
        };
        instance.addEventListener('scroll', handleScroll);

        return () => {
            instance.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidbar')}>
                <Sidebar />
            </div>
            <div className={cx('main_page')} ref={ref}>
                <Header styles={cx('header_main_page')} isScrollHeader={isScroll}/>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default AccountLayout;
