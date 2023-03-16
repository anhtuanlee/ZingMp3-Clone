import { useDispatch, useSelector } from 'react-redux';
import { playMusic } from '../../../redux/actions';
import { isPlayingSelector } from '../../../redux/selector';
import { Pause, Play } from '../../Icons';
import Button from '../Button';

export const ButtonEffectPlay = ({ sizes }) => {
    const dispatch = useDispatch();
    const _isPlaying = useSelector(isPlayingSelector);

    const handleTogglePlaySong = () => {
        dispatch(playMusic(!_isPlaying));
    };
    return (
        <Button
            sizes={sizes}
            Icons={_isPlaying ? Pause : Play}
            effectHover // effect type
            onHandle={handleTogglePlaySong}
        />
    );
};
