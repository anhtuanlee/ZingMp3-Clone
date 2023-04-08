import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RenderFullListSong } from '../../Feature/HandleEvent/handleEvent';
import TitlePage from '../../layouts/components/TitlePage/TitlePage';
import { sidebarSlice, statusSlice } from '../../redux/sliceReducer';
import { getMusicTop } from '../../services/getMusicTopApi';
import styles from './Top100.module.scss';
const cx = classNames.bind(styles);

function Top100() {
    const [dataNewSong, setDataNewSong] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(statusSlice.actions.isPageLoadingChange(true));
        const fetchNewSong = async () => {
            const result = await getMusicTop().then((data) => {
                setDataNewSong(data);
                dispatch(statusSlice.actions.isPageLoadingChange(false));
            });
            return result;
        };
        fetchNewSong();

        dispatch(sidebarSlice.actions.setIdSidebarActive(7));
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            <TitlePage title="Top 100" sizes="large" data={dataNewSong} />

            <div className={cx('content_section')}>
                <RenderFullListSong data={dataNewSong} HomePageTrending />
            </div>
        </div>
    );
}

export default Top100;
