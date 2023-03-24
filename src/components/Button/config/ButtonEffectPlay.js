import { useDispatch, useSelector } from 'react-redux';
import { combinedStatusSelector } from '../../../redux/selector';
import { featureSlice, statusSlice } from '../../../redux/sliceReducer';
import { Pause, Play } from '../../Icons';
import Button from '../Button';
export const ButtonEffectPlay = ({ children, sizes, data, isSlugNameFromLocation }) => {
    const dispatch = useDispatch();
    const { isPlaying } = useSelector(combinedStatusSelector);
    const handleTogglePlaySong = () => {
        if (data) {
            // data from banner singer
            const randomIndex = Math.floor(Math.random() * data?.length);
            if (isSlugNameFromLocation) {
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
            dispatch(statusSlice.actions.isPlayingChange(!isPlaying));
        }
    };
    return (
        <Button
            sizes={sizes}
            LeftIcons={
                data
                    ? isPlaying && isSlugNameFromLocation
                        ? isPlaying
                            ? Pause
                            : Play
                        : Play
                    : undefined
            }
            Icons={!data ? (isPlaying ? Pause : Play) : undefined} // with noraml button in title
            effectHoverReverse // effect type
            onHandle={handleTogglePlaySong}
        >
            {children}
        </Button>
    );
};
