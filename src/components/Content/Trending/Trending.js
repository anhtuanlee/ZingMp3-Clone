import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Trending.module.scss';

import {
    handleFilterSongTrending,
    handleSelectButtonNational,
    RenderButtonSelect,
    RenderFullListSong,
} from '../../../Feature/HandleEvent/handleEvent';
import { ALL_NATIONAL } from '../../../redux/constant';
import { statusSlice } from '../../../redux/sliceReducer';
import { combinedStatusSelector } from '../../../redux/selector';
import { getTrendingDataApi } from '../../../services';
import Loading from '../../../pages/Loading';

const cx = classNames.bind(styles);

function Trending() {
    const dispatch = useDispatch();
    const { isLoadingPage } = useSelector(combinedStatusSelector);
    const [dataTrending, setDataTrending] = useState([]);
    const [paramsFilter, setParamsFilter] = useState(ALL_NATIONAL);
    const [dataSelect, setDataSelect] = useState([]);
    const dataSliceRenderRender = dataSelect.slice(0, 12); // slice 12 song to render in content

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
            const response = await getTrendingDataApi(50);
            const dataFilter = handleFilterSongTrending(response, paramsFilter);
            setDataTrending(response);
            setDataSelect(dataFilter); // default when reload page will use paramFilter recent to render data
            dispatch(statusSlice.actions.isPageLoadingChange(false));
        };
        fetch();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {isLoadingPage && <Loading styles={{ width: '15%', height: '5vh' }} />}
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
                <RenderFullListSong
                    data={dataSliceRenderRender}
                    HomePageTrending={true}
                />
            </div>
        </div>
    );
}

export default Trending;
