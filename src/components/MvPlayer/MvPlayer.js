import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ControlsLeft from '../../layouts/components/Controls/ControlsLeft';
import { combinedStatusSelector } from '../../redux/selector';
import { statusSlice } from '../../redux/sliceReducer';
import Button from '../Button';
import { Close } from '../Icons';
import styles from './MvPlayer.module.scss';

const cx = classNames.bind(styles);

function MvPlayer() {
    const dispatch = useDispatch();
    const { songCurrent, isContentHide, } =
        useSelector(combinedStatusSelector);
    const [urlMv, setUrlMv] = useState('');
    const handleCloseMv = () => {
        dispatch(statusSlice.actions.isCheckBeforeContentHide(true));
        setTimeout(() => {
            dispatch(statusSlice.actions.isMvPlayerChange(false));
            dispatch(statusSlice.actions.isCheckBeforeContentHide(false));
            // delay time dispath
        }, 300);
    };
    useEffect(() => {
        setUrlMv(songCurrent?.link_mv);
    }, [songCurrent]);
    return (
        <div className={cx('wrapper', isContentHide ? 'off' : '')}>
            <div className={cx('container')}>
                <header className={cx('header_mv')}>
                    <div className={cx('title_singer')}>
                        <ControlsLeft styleImg="border" styleTitle={cx('title_mv')} />
                    </div>
                    <Button circle Icons={Close} onHandle={handleCloseMv} />
                </header>
                <div className={cx('content_section')}>
                    {/* play_mv */}
                    <iframe 
                    title={songCurrent?.music_name}
                    loading='lazy' 
                        className={cx('ifarme_player')}
                        src={`https://www.youtube.com/embed/${urlMv}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default MvPlayer;
