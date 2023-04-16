import React from 'react';
import Media from 'react-media';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import ControlsLeft from './ControlsLeft';
import ControlsRight from './ControlsRight';
import styles from './Controls.module.scss';
import ControlsCenter from './ControlsCenter';
import ControlMobile from './Mobile/ControlsMobile';
import { statusSlice } from '../../../redux/sliceReducer';
import { combinedStatusSelector } from '../../../redux/selector';

const cx = classNames.bind(styles);
function Controls() {
    const dispatch = useDispatch();
    const { isControlMusicMobile, isPlayerQueue } = useSelector(combinedStatusSelector);

    const handleOpenControl = (e) => {
        if (isPlayerQueue) {
            dispatch(statusSlice.actions.isPlayerQueue(false));
        }
        dispatch(statusSlice.actions.isControlMusicMobile(true));
    };
    return (
        <Media
            queries={{
                small: '(max-width:600px)',
                medium: '(min-width: 601px) and (max-width: 900px)',
                large: '(min-width:901px)',
            }}
        >
            {(matches) => (
                <div>
                    {matches.small &&
                        (isControlMusicMobile ? (
                            <ControlMobile />
                        ) : (
                            <div
                                className={cx('wrapper')}
                                onClick={(e) => handleOpenControl(e)}
                            >
                                <ControlsLeft isMobile />
                                <ControlsCenter isMobile />
                                <ControlsRight isMobile />
                            </div>
                        ))}
                    {(matches.medium || matches.large) && (
                        <div className={cx('wrapper')}>
                            <ControlsLeft />
                            <ControlsCenter />
                            <ControlsRight />
                        </div>
                    )}
                </div>
            )}
        </Media>
    );
}

export default Controls;
