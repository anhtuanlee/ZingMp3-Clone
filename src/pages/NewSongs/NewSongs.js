import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './NewSongs.module.scss';
import { newSongApi } from '../../services';
import { sidebarSlice, statusSlice } from '../../redux/sliceReducer';
import TitlePage from '../../layouts/components/TitlePage/TitlePage';
import { RenderFullListSong } from '../../Feature/HandleEvent/handleEvent';

const cx = classNames.bind(styles);

function NewUpdate() {
    const [dataNewSong, setDataNewSong] = useState([]);
    const dispatch = useDispatch();
     
    useEffect(() => {
        dispatch(statusSlice.actions.isPageLoadingChange(true));
        const fetchNewSong = async () => {
            const result = await newSongApi(100) 
            setDataNewSong(result);
            dispatch(statusSlice.actions.isPageLoadingChange(false));
            return result;
        };
        fetchNewSong();

        dispatch(sidebarSlice.actions.setIdSidebarActive(3));
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            <TitlePage title="Nhạc Mới" sizes="large" data={dataNewSong} />

            <div className={cx('content_section')}>
                <RenderFullListSong data={dataNewSong} isRank />
            </div>
        </div>
    );
}

export default NewUpdate;
