import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SliderSlick from '../../layouts/components/Sliderslick';
import { activeSidebar } from '../../redux/actions';
import Content from '../../components/Content';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { songCurrentSelector } from '../../redux/selector';
import Loading from '../../pages/Loading';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(activeSidebar(1));
    }, []);
    const _songCurrent = useSelector(songCurrentSelector);
    useEffect(() => {
        if (!_songCurrent) {
            navigate('..');
        }
    }, [_songCurrent]);
    return _songCurrent === undefined ? (
        <div className={cx('loading')}>
            <Loading /> 
        </div>
    ) : (
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
