import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { Pause, Play } from '../../components/Icons';
import { isPlayingSelector, songCurrentSelector } from '../../redux/selector';
import styles from './Album.module.scss';
import PlayListSong from '../../Feature/PlayListSong';
import Loading from '../Loading';
import { useEffect, useState } from 'react';
import { getSingerData } from '../../services';
import { playMusic } from '../../redux/actions';
const cx = classNames.bind(styles);

function Album() {
    const dispatch = useDispatch()
    const _isPlaying = useSelector(isPlayingSelector) 

    const [dataFullSong, setDataSinger] = useState([]);
    const [currentSinger, setCurrentSinger] = useState('');
    const { nickname } = useParams();
 

    useEffect(() => {
        const fetch = async () => {
            const result = await getSingerData(nickname).then(
                (dataFullSong) => {
                    setDataSinger(dataFullSong);
                    setCurrentSinger(
                        dataFullSong[dataFullSong.length - 1].name_singer,
                    );
                },
            );
            return result;
        };
        fetch();
    }, [nickname]);
    const handleClickToggleBtnPlay = () => {
        dispatch(playMusic(!_isPlaying));
    };
    const renderFullListSong = () => {
        const renderAllSong = dataFullSong.map((song, index) => {
            return (
                <PlayListSong
                    data={dataFullSong}
                    song={song}
                    index={index}
                    key={index}
                />
            );
        });
        return renderAllSong;
    };
    return dataFullSong.length === 0 ? (
        <div className={cx('loading')}>
            <Loading />
        </div>
    ) : (
        <div className={cx('wrapper')}>
            <h2 className={cx('title_header')}>
                {currentSinger} - Tất Cả Bài Hát
                <span>
                    <Button
                        onHandle={handleClickToggleBtnPlay}
                        Icons={_isPlaying ? Pause : Play}
                        effectHover // effect type
                        sizes="small"
                    />
                </span>
            </h2>

            <div className={cx('container_listsong_full')}>
                {renderFullListSong()}
            </div>
        </div>
    );
}

export default Album;
