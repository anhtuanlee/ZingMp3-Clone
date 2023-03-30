import { useDispatch, useSelector } from 'react-redux';
import { combinedStatusSelector } from '../redux/selector';

import Button from '../components/Button';
import { Heart, More, Play } from '../components/Icons';
import WaveSong from '../components/Icons/WaveSong';
import { featureSlice, statusSlice } from '../redux/sliceReducer';
import styles from './PlayListSong.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const ActionBtnAlbum = ({
    item,
    isLivingAlbum,
    singleBtn,
    data,
    HomePageTrending,
    playlistSong,
    isListQueue,
}) => {
    const dispatch = useDispatch();
    const { slugDataBanner, isPlaying, songCurrent } =
        useSelector(combinedStatusSelector); // slug_name in

    const isSlugCategory = slugDataBanner === item?.slug_category;
    const isSlugNameSinger = slugDataBanner === item?.slug_name_singer;
    const isSlugCategoryCurrent = songCurrent?.slug_category === item?.slug_category;
    const isSlugNameSingerCurrent =
        songCurrent?.slug_name_singer === item?.slug_name_singer;

    const BUTTON_HOVER = [
        {
            extraTitle: 'Thêm vào thư viện',
            icon: Heart,
            circle: true,
            type: 'like',
        },
        {
            icon:
                (isSlugCategory && isSlugCategoryCurrent && isPlaying) ||
                (isSlugNameSinger && isSlugNameSingerCurrent && isPlaying)
                    ? WaveSong
                    : Play,
            border: true,
            border_nothover: true,
            type: 'play',
        },
        {
            extraTitle: 'Khác',
            icon: More,
            circle: true,
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
                    return dispatch(statusSlice.actions.isPlayingChange(!isPlaying));
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
                        const randomID = Math.floor(Math.random() * data?.length);
                        /*check action in home page  ? if true will update data new song , if false will request play and 
                        dispath data to album
                         */
                        if (data.length > 0) {
                            return (
                                dispatch(featureSlice.actions.setCurrentID(randomID)) &&
                                dispatch(
                                    featureSlice.actions.setSongCurrent(data[randomID]),
                                ) &&
                                dispatch(featureSlice.actions.setDataSongs(data)) &&
                                dispatch(statusSlice.actions.isPlayingChange(true))
                            );
                        }
                    } else {
                        console.log('play_require');

                        return dispatch(statusSlice.actions.isRequirePlayChange(true));
                    }
                case 'like':
                    e.preventDefault();
                    console.log('like2');
                    break;
                case 'more':
                    e.preventDefault();
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
                                circle={btn.circle}
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
                            circle={btn.circle}
                            border_nothover={btn.border_nothover}
                            title={item?.title}
                            onHandle={(e) => onHandle(e, btn)}
                            isListQueue={isListQueue}
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
                            circle={btn.circle}
                            border_nothover={btn.border_nothover}
                            title={item?.title}
                            onHandle={(e) => onHandle(e, btn)}
                            className={cx('btn_action')}
                        />
                    </div>
                );
            }
        }
    });

    return result;
};
