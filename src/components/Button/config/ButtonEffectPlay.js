import { useDispatch, useSelector } from 'react-redux';
import {
    currentSong,
    dataSongs,
    playMusic,
    setCurrentID,
} from '../../../redux/actions';
import { isPlayingSelector } from '../../../redux/selector';
import { Pause, Play } from '../../Icons';
import Button from '../Button';

export const ButtonEffectPlay = ({
    children,
    sizes,
    data,
    isSlugNameFromLocation,
}) => {
    const dispatch = useDispatch();
    const _isPlaying = useSelector(isPlayingSelector);
    const handleTogglePlaySong = () => {
        if (data) {
            // data from banner singer
            const randomIndex = Math.floor(Math.random() * data?.length);
            if (isSlugNameFromLocation) {
                //if same currentSong and data from banner will toggle
                dispatch(playMusic(!_isPlaying));
            } else {
                // if songcurrent playing not same slugname with banner song will set data, currentIndex again
                dispatch(dataSongs(data));
                dispatch(playMusic(true));
                dispatch(setCurrentID(randomIndex));
                dispatch(currentSong(data[randomIndex]));
            }
        } else {
            dispatch(playMusic(!_isPlaying));
        }
    };
    return (
        <Button
            sizes={sizes}
            LeftIcons={
                data
                    ? _isPlaying && isSlugNameFromLocation
                        ? _isPlaying
                            ? Pause
                            : Play
                        : Play
                    : undefined
            }
            Icons={!data ? (_isPlaying ? Pause : Play) : undefined} // with noraml button in title
            effectHoverReverse // effect type
            onHandle={handleTogglePlaySong}
        >
            {children}
        </Button>
    );
};
