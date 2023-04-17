import Media from 'react-media';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Controls.module.scss';
import InputProgress from '../InputProgress';
import Button from '../../../components/Button/Button';
import { statusSlice } from '../../../redux/sliceReducer';
import { combinedStatusSelector } from '../../../redux/selector';
import { ListQueue, Multi, Mv, Volumn, VolumnOff } from '../../../components/Icons';
const cx = classNames.bind(styles);

function ControlsRight({ isMobile, isControlModal }) {
    const [style, setStyles] = useState(false);
    const { isVolume, songCurrent, isPlayerQueue } = useSelector(combinedStatusSelector);

    const dispatch = useDispatch();

    const CONTROL_BTNS_RIGHT = [
        {
            data: [
                {
                    icon: Mv,
                    disable: songCurrent?.link_mv ? false : true,
                    type: 'mv',
                    extraTitle: 'MV',
                },

                {
                    icon: Multi,
                    extraTitle: 'Chế độ cửa sổ',
                },
                {
                    icon: isVolume ? Volumn : VolumnOff,
                    type: 'volume',
                    extraTitle: 'Âm Lượng',
                },
            ],
        },
    ];
    const handle = (action) => {
        switch (action) {
            case 'volume':
                dispatch(statusSlice.actions.isVolumeChange(!isVolume));
                break;
            case 'mv':
                dispatch(statusSlice.actions.isMvPlayerChange(true));
                dispatch(statusSlice.actions.isPlayingChange(false));
                break;
            default:
                console.log('default');
        }
    };
    const handleListQueue = (e) => {
        e.stopPropagation();
        // handle queue list song
        if (isPlayerQueue) {
            dispatch(statusSlice.actions.isCheckBeforeContentHide(true));
            setTimeout(() => {
                dispatch(statusSlice.actions.isPlayerQueue(false));
                dispatch(statusSlice.actions.isCheckBeforeContentHide(false));
            }, 500);
        } else {
            dispatch(statusSlice.actions.isPlayerQueue(true));
        }
    };

    const lastData = CONTROL_BTNS_RIGHT[CONTROL_BTNS_RIGHT.length - 1].data;

    const classes = style ? 'blur_input' : '';
    
    const renderBtnsRight = () => {
        const result = lastData.map((item, index) => {
            return (
                <Media query="(max-width: 1100px)" key={index}>
                    {(matches) => {
                        return (
                            <div
                                className={cx('controls_item')}
                                onMouseOver={() => {
                                    if (item.type === 'volume') {
                                        setStyles(true);
                                    }
                                }}
                            >
                                <Button
                                    circle_hide
                                    Icons={item.icon}
                                    disable={item.disable}
                                    extraTitle={!matches && item.extraTitle}
                                    onHandle={() => handle(item.type)}
                                />
                                {item.type === 'volume' && (
                                    <div
                                        className={cx(
                                            'player_input_vol',
                                            matches && style
                                                ? 'inputVolumeTablet'
                                                : matches && !style && 'inputVolumeOff',
                                            // custom volume in tablet
                                        )}
                                        onMouseOut={() => {
                                            setStyles(false);
                                        }}
                                    >
                                        <InputProgress
                                            classes={classes}
                                            volumeType={true}
                                            max={10}
                                            isMobile={isMobile}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    }}
                </Media>
            );
        });
        return result;
    };

    return (
        <div className={cx('player_control_right')}>
            {!isMobile && !isControlModal && (
                // Desktop and Tablet
                <Fragment>
                    <div className={cx('player_controls_right_container')}>
                        {renderBtnsRight()}
                    </div>
                    <div className={cx('devide')}></div>
                </Fragment>
            )}

            {/* Mobile */}

            <div className={cx('btn_playlist_queue')}>
                <Button
                    Icons={ListQueue}
                    onHandle={(e) => handleListQueue(e)}
                    className={cx(isPlayerQueue ? 'queueOn' : 'queueOff')}
                    extraTitle="Danh Sách Phát"
                />
            </div>
        </div>
    );
}

export default ControlsRight;

ControlsRight.propTypes = {
    isMobile: PropTypes.bool,
};
