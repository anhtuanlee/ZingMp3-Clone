import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Button from '../Button';
import { Pause, Play } from '../../Icons';
import { combinedStatusSelector } from '../../../redux/selector';
import { featureSlice, statusSlice } from '../../../redux/sliceReducer';

const ButtonEffectPlay = ({ children, sizes, data = [], isSlugNameFromLocation }) => {
    const dispatch = useDispatch();
    const { isPlaying, songCurrent } = useSelector(combinedStatusSelector);

    const dataCheck = data[data?.length - 1];
    const handleTogglePlaySong = () => {
        if (data.length > 0 && dataCheck !== undefined) {
            // data from banner singer
            const randomIndex = Math.floor(Math.random() * data?.length);

            if (
                isSlugNameFromLocation ||
                songCurrent.slug_name_singer === dataCheck.slug_name_singer
            ) {
                //if same currentSong and data from banner will toggle
                dispatch(statusSlice.actions.isPlayingChange(!isPlaying));
            } else {
                // if songcurrent playing not same slugname with banner song will set data, currentIndex again
                dispatch(statusSlice.actions.isPlayingChange(true));
                dispatch(featureSlice.actions.setDataSongs(data));
                dispatch(featureSlice.actions.setCurrentID(randomIndex));
                dispatch(featureSlice.actions.setSongCurrent(data[randomIndex]));
            }
        } else {
            // if not data will send  response
            toast.warn('Bạn chưa thích bài hát nào ...');
        }
    };

    return (
        <Button
            sizes={sizes}
            Icons={
                data
                    ? (isPlaying && isSlugNameFromLocation) ||
                      songCurrent?.slug_name_singer === dataCheck?.slug_name_singer
                        ? isPlaying
                            ? Pause
                            : Play
                        : Play
                    : undefined
            }
            effectHoverReverse // effect type
            onHandle={handleTogglePlaySong}
        >
            {children}
        </Button>
    );
};
export default React.memo(ButtonEffectPlay);

ButtonEffectPlay.propTypes = {
    children: PropTypes.node,
    sizes: PropTypes.string,
    data: PropTypes.array,
    isSlugNameFromLocation: PropTypes.string,
};
