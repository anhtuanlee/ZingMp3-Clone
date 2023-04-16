import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.scss';
import Content from '../../components/Content';
import Footer from '../../components/Footer/Footer';
import { sidebarSlice } from '../../redux/sliceReducer';
import { combinedStatusSelector } from '../../redux/selector';
import SliderSlick from '../../layouts/components/Sliderslick';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { songCurrent } = useSelector(combinedStatusSelector);
    useEffect(() => {
        if (!songCurrent) {
            navigate('..');
        }
        dispatch(sidebarSlice.actions.setIdSidebarActive(1));
    }, [songCurrent, dispatch, navigate]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider_slick')}>
                <SliderSlick />
            </div>
            <div className={cx('content_container')}>
                <Content />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
