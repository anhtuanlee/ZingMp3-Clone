import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import { Random } from '../components/Icons';
import Images from '../components/Image';
import { featureSlice, statusSlice } from '../redux/sliceReducer';
import { getSingerDataApi } from '../services';
import styles from './RenderArtist.module.scss';
import { convertNumber } from '../hooks';
import { combinedStatusSelector } from '../redux/selector';
import Loading from '../pages/Loading/Loading';
const cx = classNames.bind(styles);

const RenderArtist = ({ data, dataFull, isPageArtist }) => {
    const dispatch = useDispatch();
    const { isLoadingPage } = useSelector(combinedStatusSelector);
    const handlePlayRandom = async (e, item) => {
        e.preventDefault();
        const dataListArtist = await getSingerDataApi(item.slug_name_singer).then(
            (data) => {
                const randomID = Math.floor(Math.random() * data.length);
                dispatch(featureSlice.actions.setDataSongs(data));
                dispatch(featureSlice.actions.setSongCurrent(randomID));
                dispatch(featureSlice.actions.setCurrentID(randomID));
                dispatch(statusSlice.actions.isPlayingChange(true));
            },
        );
        return dataListArtist;
    };
    const dataClone = new Array(isPageArtist ? 12 : 6).fill();

    const dataMap = isLoadingPage ? dataClone : data;

    const result = dataMap.map((item, index) => {
        const Icon = item?.icon;
        const favorite = convertNumber(item?.favorite);

        const CardArtistLoading = ({ index }) => {
            return (
                <div className={cx('card_artist')}>
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

        const CardArtist = ({ item }) => {
            return (
                <div className={cx('card_artist')}>
                    <Link
                        to={item?.image_music ? `/${item?.slug_name_singer}` : 'artist'}
                        state={
                            !item?.image_music && {
                                data: dataFull,
                            }
                        }
                    >
                        <div className={cx('card_section')}>
                            {!item?.image_music ? (
                                <div className={cx('card_image')}>
                                    <span className={cx('btn_arrow_right')}>
                                        <Icon />
                                    </span>
                                </div>
                            ) : (
                                <figure className={cx('card_image')}>
                                    <Images src={item?.image_music} />
                                    {item?.image_music && !isPageArtist && (
                                        <Button
                                            Icons={Random}
                                            onHandle={(e) => handlePlayRandom(e, item)}
                                            circle_hide
                                            className={cx('btn_random_card_artist')}
                                        />
                                    )}
                                </figure>
                            )}
                        </div>
                    </Link>
                    <Link
                        to={item?.image_music ? `/${item?.slug_name_singer}` : 'artist'}
                        state={
                            !item?.image_music && {
                                data: dataFull,
                            }
                        }
                    >
                        <span className={cx('name_artist')}>{item?.name_singer}</span>
                    </Link>

                    {isPageArtist && (
                        <div className={cx('extra_title')}>
                            <span
                                className={cx('follow_user')}
                            >{`${favorite} quan tâm`}</span>
                            <Button
                                LeftIcons={Random}
                                onHandle={(e) => handlePlayRandom(e, item)}
                                text_border
                                className={cx('btn_random_card_artist')}
                            >
                                GÓC NHẠC
                            </Button>
                        </div>
                    )}
                </div>
            );
        };
        return isLoadingPage ? (
            <CardArtistLoading key={index} />
        ) : (
            <CardArtist item={item} key={index} />
        );
    });
    return result;
};
export default RenderArtist;
