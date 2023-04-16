import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import Header from '../../layouts/components/Header';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const ref = useRef();
    const wrapperRef = useRef();
    const [isScroll, setScroll] = useState();
    const params = useParams();
    //handle Scroll in main page

    useEffect(() => {
        const instance = ref.current;

        const handleScroll = () => {
            setScroll(instance.scrollTop);
        };
        instance.addEventListener('scroll', handleScroll);

        return () => instance.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        const instance = ref.current;
        if (params) {
            instance.scrollTo(0, 0);
        }
    }, [params]);
    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <div className={cx('sidbar')}>
                <Sidebar />
            </div>
            <div className={cx('main_page')} ref={ref}>
                <div className={cx('header')}>
                    <Header isScrollHeader={isScroll} />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
DefaultLayout.propTypes = {
    children: PropTypes.node,
};
