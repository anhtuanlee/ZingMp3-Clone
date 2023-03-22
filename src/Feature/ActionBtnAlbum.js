import { useDispatch, useSelector } from 'react-redux';
import {
    currentSong,
    dataSongs,
    playMusic,
    requirePlay,
    setCurrentID,
} from '../redux/actions';
import {
    isPlayingSelector,
    slugDataBannerSelector,
    songCurrentSelector,
} from '../redux/selector';

import Button from '../components/Button';
import { Heart, More, Play } from '../components/Icons';
import WaveSong from '../components/Icons/WaveSong';

export const ActionBtnAlbum = ({
    item,
    isLivingAlbum,
    singleBtn,
    data,
    HomePageTrending,
    playlistSong,
}) => {
    const dispatch = useDispatch();
    const _slugDataBanner = useSelector(slugDataBannerSelector); // slug_name in item
    const _isPlaying = useSelector(isPlayingSelector);
    const _songCurrent = useSelector(songCurrentSelector);
    const isSlugCategory = _slugDataBanner === item?.slug_category;
    const isSlugNameSinger = _slugDataBanner === item?.slug_name_singer;
    const isSlugCategoryCurrent =
        _songCurrent?.slug_category === item?.slug_category;
    const isSlugNameSingerCurrent =
        _songCurrent?.slug_name_singer === item?.slug_name_singer;

    const BUTTON_HOVER = [
        {
            extraTitle: 'Thêm vào thư viện',
            icon: Heart,
            circle_hide: true,
            type: 'like',
        },
        {
            icon:
                (isSlugCategory && isSlugCategoryCurrent && _isPlaying) ||
                (isSlugNameSinger && isSlugNameSingerCurrent && _isPlaying)
                    ? WaveSong
                    : Play,
            border: true,
            border_nothover: true,
            type: 'play',
        },
        {
            extraTitle: 'Khác',
            icon: More,
            circle_hide: true,
            type: 'more',
        },
    ]; 
    const onHandle = (e, btn) => {
        if (
            (isSlugCategory && isSlugCategoryCurrent) ||
            (isSlugNameSinger && isSlugNameSingerCurrent)
        ) {
            // check itemcurrent and item saved in album

            e.preventDefault();
            switch (btn.type) {
                case 'like':
                    console.log('like');
                    break;
                case 'play':
                    console.log('play1');
                    return dispatch(playMusic(!_isPlaying));
                case 'more':
                    console.log('morexx');
                    break;
                default:
                    console.log('default');
            }
        } else {
            switch (btn.type) {
                case 'play':
                    if (isLivingAlbum) {
                        const randomID = Math.floor(
                            Math.random() * data?.length,
                        );
                        /*check action in home page  ? if true will update data new song , if false will request play and 
                        dispath data to album
                         */
                        if (data.length > 0) {
                            return (
                                dispatch(setCurrentID(randomID)) &&
                                dispatch(currentSong(data[randomID])) &&
                                dispatch(dataSongs(data)) &&
                                dispatch(playMusic(true))
                            );
                        }
                    } else {
                        console.log('play_require');

                        return dispatch(requirePlay(true));
                    }
                case 'like':
                    console.log('like2');
                    break;
                case 'more':
                    console.log('more2');
                    break;
                default:
                    console.log('default');
            }
        }
    };

    const result = BUTTON_HOVER.map((btn, index) => {
        const shouldRenderButton = !singleBtn || btn.type === 'play';

        if (playlistSong) {
            if (HomePageTrending) {
                // from home page
                if (btn.type === 'more') {
                    return (
                        <div key={index}>
                            <Button
                                Icons={btn.icon}
                                extraTitle={btn.extraTitle}
                                circle_hide={btn.circle_hide}
                                border_nothover={btn.border_nothover}
                                title={item?.title}
                                onHandle={(e) => onHandle(e, btn)}
                            />
                        </div>
                    );
                }
            } else if (btn.type === 'more' || btn.type === 'like') {
                return (
                    <div key={index}>
                        <Button
                            Icons={btn.icon}
                            extraTitle={btn.extraTitle}
                            circle_hide={btn.circle_hide}
                            border_nothover={btn.border_nothover}
                            title={item?.title}
                            onHandle={(e) => onHandle(e, btn)}
                        />
                    </div>
                );
            }
        } else {
            if (shouldRenderButton) {
                // render full btn
                return (
                    <div key={index}>
                        <Button
                            Icons={btn.icon}
                            extraTitle={btn.extraTitle}
                            circle_hide={btn.circle_hide}
                            border_nothover={btn.border_nothover}
                            title={item?.title}
                            onHandle={(e) => onHandle(e, btn)}
                        />
                    </div>
                );
            }
        }
    });

    return result;
};
