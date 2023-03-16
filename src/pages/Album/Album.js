import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ButtonEffectPlay } from '../../components/Button';
import PlayListSong from '../../Feature/PlayListSong';
import { activeSidebar } from '../../redux/actions';
import { getSingerData } from '../../services';
import Loading from '../Loading';
import styles from './Album.module.scss';
const cx = classNames.bind(styles);

function Album() {
    const [dataFullSongs, setDataSinger] = useState([]);
    const [currentSinger, setCurrentSinger] = useState('');
    const { nickname } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();  
    useEffect(() => {
        const fetch = async () => {
            if (dataFullSongs.length === 0) {
                try {
                    const result = await getSingerData(nickname).then(
                        (dataFullSong) => {
                            setDataSinger(dataFullSong);
                            setCurrentSinger(
                                dataFullSong[dataFullSong.length - 1]
                                    .name_singer,
                            );
                        },
                    );
                    return result;
                } catch (error) {
                    if (error) {
                        navigate('..');
                    }
                }
            }
        };
        fetch();
    }, [nickname]);

    useEffect(() => {
        dispatch(activeSidebar(null)); // not active sidebar
    }, []);

    const renderFullListSong = () => {
        const renderAllSong = dataFullSongs.map((song, index) => {
            return (
                <PlayListSong
                    data={dataFullSongs}
                    song={song}
                    index={index}
                    key={index}
                />
            );
        });
        return renderAllSong;
    };
    return dataFullSongs.length === 0 ? (
        <div className={cx('loading')}>
            <Loading />
        </div>
    ) : (
        <div className={cx('wrapper')}>
            <h2 className={cx('title_header')}>
                <span className={cx('title_header_section')} onClick={() => navigate('..')}>
                    {currentSinger} - Tất Cả Bài Hát
                </span>
                <ButtonEffectPlay sizes="small" />
            </h2>

            <div className={cx('container_listsong_full')}>
                {renderFullListSong()}
            </div>
        </div>
    );
}

export default Album;
