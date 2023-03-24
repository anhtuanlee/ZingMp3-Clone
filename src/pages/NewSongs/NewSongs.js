import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonEffectPlay } from '../../components/Button';
import { renderFullListSong } from '../../Feature/HandleEvent/handleEvent';
import { sidebarSlice } from '../../redux/sliceReducer';
import { newSongApi } from '../../services';
import Loading from '../Loading';
import styles from './NewSongs.module.scss';
const cx = classNames.bind(styles);

function NewUpdate() {
    const [dataNewSong, setDataNewSong] = useState([]);
    const dispatch = useDispatch();
    const isRank = true;
    useEffect(() => {
        const fetchNewSong = async () => {
            const result = await newSongApi(100).then((data) => setDataNewSong(data));
            return result;
        };
        fetchNewSong();

        dispatch(sidebarSlice.actions.setIdSidebarActive(5));
    }, []);

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
                <div className={cx('content_section')}>
                    {renderFullListSong(dataNewSong, isRank)}
                </div>
            )}
        </div>
    );
}

export default NewUpdate;
