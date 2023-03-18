import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonEffectPlay } from '../../components/Button';
import { renderFullListSong } from '../../Feature/HandleEvent/handleEvent';
import { activeSidebar } from '../../redux/actions';
import { getSingerDataApi } from '../../services';
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
                    const result = await getSingerDataApi(nickname).then(
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

    return dataFullSongs.length === 0 ? (
        <div className={cx('loading')}>
            <Loading />
        </div>
    ) : (
        <div className={cx('wrapper')}>
            <h2 className={cx('title_header')}>
                <span
                    className={cx('title_header_section')}
                    onClick={() => navigate('..')}
                >
                    {currentSinger} - Tất Cả Bài Hát
                </span>
                <ButtonEffectPlay sizes="small" />
            </h2>

            <div className={cx('container_listsong_full')}>
                {renderFullListSong(dataFullSongs)}
            </div>
        </div>
    );
}

export default Album;
