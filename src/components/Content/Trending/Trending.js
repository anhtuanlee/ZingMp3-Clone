import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    handleFilterSongTrending,
    handleSelectButtonNational,
    RenderButtonSelect,
    RenderFullListSong,
} from '../../../Feature/HandleEvent/handleEvent';
import Loading from '../../../pages/Loading';
import { ALL_NATIONAL } from '../../../redux/constant';
import { combinedStatusSelector } from '../../../redux/selector';
import { statusSlice } from '../../../redux/sliceReducer';
import { getTrendingDataApi } from '../../../services';
import styles from './Trending.module.scss';
const cx = classNames.bind(styles);
function Trending() {
    const dispatch = useDispatch();
    const { isLoadingPage } = useSelector(combinedStatusSelector);
    const [dataTrending, setDataTrending] = useState([]);
    const [paramsFilter, setParamsFilter] = useState(ALL_NATIONAL);
    const [dataSelect, setDataSelect] = useState([]);
    const dataSliceRenderRender = dataSelect.slice(0, 12); // slice 12 song to render in content
    const HomePageTrending = true;
    const onHandleSelectNational = (item) => {
        // handle Select National
        const selectNational = handleSelectButtonNational(item);
        setParamsFilter(selectNational);
    };

    useEffect(() => {
        // paramFilter  change will change dataFilter
        const dataFilter = handleFilterSongTrending(dataTrending, paramsFilter);
        setDataSelect(dataFilter);
    }, [paramsFilter]);

    useEffect(() => {
        dispatch(statusSlice.actions.isPageLoadingChange(true));
        const fetch = async () => {
            const response = await getTrendingDataApi(50).then((data) => {
                const dataFilter = handleFilterSongTrending(data, paramsFilter);
                setDataTrending(data);
                setDataSelect(dataFilter); // default when reload page will use paramFilter recent to render data
                dispatch(statusSlice.actions.isPageLoadingChange(false));
            });

            return response;
        };
        fetch();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {isLoadingPage && <Loading  styles={{width: '15%',height: '5vh'}}/>}
            {!isLoadingPage && (
                <div className={cx('title_section')}>
                    <h2>Trending</h2>
                    <Link to="top-trending?_filter=all">
                        <span>
                            TẤT CẢ
                            <span className={cx('chevon_right')}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </span>
                        </span>
                    </Link>
                </div>
            )}

            <div className={cx('button_select_national')}>
                {RenderButtonSelect(paramsFilter, onHandleSelectNational)}
            </div>
            <div className={cx('container_list_song')}>
                {RenderFullListSong(dataSliceRenderRender, undefined, HomePageTrending)}
            </div>
        </div>
    );
}

export default Trending;
