import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CirleLive, Play } from '../components/Icons';
import WaveSong from '../components/Icons/WaveSong';
import Images from '../components/Image';
import { convertNumber } from '../hooks';
import Loading from '../pages/Loading/Loading';
import { combindStatusRadio } from '../redux/selector';
import { featureSlice, radioSlice, statusSlice } from '../redux/sliceReducer';
import styles from './RenderRadio.module.scss';

const cx = classNames.bind(styles);
const RenderRadio = ({ dataFull, isLoading }) => {
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false);
    const { isPlayingRadio, radioDetails } = useSelector(combindStatusRadio);

    const dataLoading = new Array(20).fill();
    const dataRender = isLoading ? dataLoading : dataFull?.items;

    const handlePlayRadio = (item) => {
        if (item.encodeId !== radioDetails?.encodeId) {
            dispatch(radioSlice.actions.setIsPlayingRadio(true));
            dispatch(statusSlice.actions.isPlayingChange(false));
            dispatch(radioSlice.actions.setUrlRadio(item.streaming));
            dispatch(radioSlice.actions.setRadioDetails(item));
            dispatch(featureSlice.actions.setSongCurrent({ src_music: '' }));
        } else {
            dispatch(radioSlice.actions.setIsPlayingRadio(!isPlayingRadio));
        }
    };

    const result = dataRender?.map((item, index) => {
        const CardArtistLoading = () => {
            return (
                <div className={cx('card_radio')}>
                    <Loading
                        styles={{
                            width: '100%',
                            height: 0,
                            paddingBottom: '100%',
                            borderRadius: 999,
                        }}
                    />
                    <Loading
                        styles={{
                            width: '100%',
                        }}
                    />
                    <Loading
                        styles={{
                            margin: '0 auto',
                            width: '70%',
                        }}
                    />
                    <Loading
                        styles={{
                            margin: '0 auto',
                            width: '60%',
                            height: '30px',
                            borderRadius: '100px',
                        }}
                    />
                </div>
            );
        };

        const listener = convertNumber(item?.activeUsers);
        return isLoading ? (
            <CardArtistLoading key={index} />
        ) : (
            <div key={index} className={cx('card_radio')}>
                <div
                    className={cx('card_item')}
                    onMouseEnter={() => setIsHover(index)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <figure
                        className={cx(
                            'card_image',
                            isHover === index && 'isHover',
                            item?.encodeId === radioDetails?.encodeId && 'radio_playing',
                        )}
                    >
                        <Images src={item?.thumbnailV} />
                    </figure>
                    <figure className={cx('card_extra_image')}>
                        <Images src={item?.thumbnailM} />
                    </figure>
                    <CirleLive randomCircleDeg={item.streaming} />
                    <figure
                        className={cx('card_img_btn_live', !item.streaming && 'unlive')}
                    >
                        <Images
                            className={cx(!item.streaming && 'unlive')}
                            src={
                                'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/live-tag.svg'
                            }
                        />
                    </figure>
                    {(isHover === index || item?.encodeId === radioDetails?.encodeId) && (
                        <span
                            className={cx('btn_action')}
                            onClick={() => handlePlayRadio(item)}
                        >
                            {isPlayingRadio && item.encodeId === radioDetails.encodeId ? (
                                <WaveSong />
                            ) : (
                                <Play />
                            )}
                        </span>
                    )}
                </div>
                <span className={cx('name_artist')}>{item.title}</span>
                <span className={cx('user_listening')}>{listener} người đang nghe</span>
            </div>
        );
    });
    return result;
};
export default React.memo(RenderRadio);

RenderRadio.propTypes = {
    isLoading: PropTypes.bool,
    dataFull: PropTypes.object,
};
