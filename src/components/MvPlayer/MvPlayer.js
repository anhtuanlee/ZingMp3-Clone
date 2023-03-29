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
    const { songCurrent } = useSelector(combinedStatusSelector);

    const [check, setCheck] = useState(false);
    const handleCloseMv = () => {
        setCheck(true);
        setTimeout(() => {
            dispatch(statusSlice.actions.isMvPlayerChange(false));
            // delay time dispath
        }, 300);
    };

    return (
        <div className={cx('wrapper', check ? 'off' : '')}>
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
                        className={cx('ifarme_player')}
                        src={`https://www.youtube.com/embed/${songCurrent.link_mv}`}
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default MvPlayer;
