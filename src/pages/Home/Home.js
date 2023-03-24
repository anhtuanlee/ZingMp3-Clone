import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Content from '../../components/Content';
import SliderSlick from '../../layouts/components/Sliderslick';
import Loading from '../../pages/Loading';
import { combinedStatusSelector } from '../../redux/selector';
import { sidebarSlice } from '../../redux/sliceReducer';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);
function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(sidebarSlice.actions.setIdSidebarActive(1));
        window.scrollTo(0, 0);
    }, []);
    const { songCurrent } = useSelector(combinedStatusSelector);
    useEffect(() => {
        if (!songCurrent) {
            navigate('..');
        }
    }, [songCurrent]);
    return songCurrent === undefined ? (
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
