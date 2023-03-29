import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonEffectPlay } from '../../components/Button';
import { RenderFullListSong } from '../../Feature/HandleEvent/handleEvent';
import TitlePage from '../../layouts/TitlePage/TitlePage';
import { combinedStatusSelector } from '../../redux/selector';
import { sidebarSlice, statusSlice } from '../../redux/sliceReducer';
import { newSongApi } from '../../services';
import styles from './NewSongs.module.scss';
const cx = classNames.bind(styles);

function NewUpdate() {
    const [dataNewSong, setDataNewSong] = useState([]);
    const dispatch = useDispatch();
    const isRank = true;
    useEffect(() => {
        dispatch(statusSlice.actions.isPageLoadingChange(true));
        const fetchNewSong = async () => {
            const result = await newSongApi(100).then((data) => {
                setDataNewSong(data);
                dispatch(statusSlice.actions.isPageLoadingChange(false));
            });
            return result;
        };
        fetchNewSong();

        dispatch(sidebarSlice.actions.setIdSidebarActive(5));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <TitlePage title="Nhạc Mới" sizes="large" data={dataNewSong}/>

            <div className={cx('content_section')}>
                {RenderFullListSong(dataNewSong, isRank)}
            </div>
        </div>
    );
}

export default NewUpdate;
