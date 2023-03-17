import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SliderSlick from '../../layouts/components/Sliderslick';
import { activeSidebar } from '../../redux/actions';
import Content from '../../components/Content';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);
function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(activeSidebar(1));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider_slick')}>
                <SliderSlick />
            </div>
            <div className={cx('content_container')}>
                <Content />
            </div>
        </div>
    );
}

export default Home;
