import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonEffectPlay } from '../../components/Button';
import PlayListSong from '../../Feature/PlayListSong';
import { activeSidebar } from '../../redux/actions';
import { newSongApi } from '../../services';
import Loading from '../Loading';
import styles from './NewSongs.module.scss';
const cx = classNames.bind(styles);

function NewUpdate() {
    const [dataNewSong, setDataNewSong] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchNewSong = async () => {
            const result = await newSongApi(100).then((data) =>
                setDataNewSong(data),
            );
            return result;
        };
        fetchNewSong();

        dispatch(activeSidebar(5))

    }, []);

    const renderNewSong = () => {
        const result = dataNewSong.map((song, index) => {
            return (
                <div className={cx('song_section')} key={index}>
                    <PlayListSong
                        data={dataNewSong}
                        song={song}
                        index={index}
                        rank={true}
                    />
                </div>
            );
        });
        return result;
    };
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header_section')}>
                <h3>Nhạc Mới</h3>
                <ButtonEffectPlay />
            </header>
            {dataNewSong.length === 0 ? (
                <div className={cx('loading')}>
                    <Loading />
                </div>
            ) : (
                <div className={cx('content_section')}>{renderNewSong()}</div>
            )}
        </div>
    );
}

export default NewUpdate;
