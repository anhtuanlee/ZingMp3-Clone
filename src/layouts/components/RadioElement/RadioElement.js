import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { combindStatusRadio, combinedStatusSelector } from '../../../redux/selector';
function RadioElement({ ref }) {
    const { isPlayingRadio, urlRadio } = useSelector(combindStatusRadio); 
    const {volume} = useSelector(combinedStatusSelector)
    return (
        <ReactPlayer
            height={0}
            width={0}
            ref={ref} 
            volume={volume}
            playing={isPlayingRadio}
            url={urlRadio}
        />
    );
}

export default RadioElement;
