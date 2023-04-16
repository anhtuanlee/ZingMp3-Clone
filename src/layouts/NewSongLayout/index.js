import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import styles from './NewSongLayout.module.scss';

const cx = classNames.bind(styles);

function NewSongLayout({ children }) {
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
                <div className={cx('box-1', 'box')}></div>
                <div className={cx('box-2', 'box')}></div>
                <div className={cx('box-3', 'box')}></div>
                <div>
                    <Header styles={cx('header')} isScrollHeader={isScroll} />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default NewSongLayout; 

NewSongLayout.propTypes = {
    children: PropTypes.node,
};
