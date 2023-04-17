import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
    handleFilterSongTrending,
    handleSelectButtonNational,
    RenderButtonSelect,
    RenderFullListSong,
} from '../../Feature/HandleEvent/handleEvent';
import styles from './Trending.module.scss';
import { getTrendingDataApi } from '../../services';
import { sidebarSlice, statusSlice } from '../../redux/sliceReducer';
import TitlePage from '../../layouts/components/TitlePage/TitlePage';

const cx = classNames.bind(styles);

function Trending() {
    const dispatch = useDispatch();

    const [dataApiReturn, setDataApiReturn] = useState([]); // take data from api
    const [dataSelect, setDataSelect] = useState([]); // filter data render from dataApi

    const [searchParams, setSearchParams] = useSearchParams(); // take params search url
    const [paramsFilter, setParamsFilter] = useState(() => {
        return searchParams.get('_filter'); // will return params first when reload page with data was set
    });
    const isTrendingPage = true; // check page or content

    const onHandleSelectNational = (item) => {
        const selectNational = handleSelectButtonNational(item);

        setSearchParams({
            _filter: selectNational,
        });
    };

    useEffect(() => {
        const dataFilter = handleFilterSongTrending(dataApiReturn, paramsFilter);
        setDataSelect(dataFilter);
        setParamsFilter(paramsFilter);
    }, [paramsFilter, dataApiReturn]);

    useEffect(() => {
        dispatch(statusSlice.actions.isPageLoadingChange(true));

        const fetch = async () => {
            const response = await getTrendingDataApi(100);
            const dataFilter = handleFilterSongTrending(response, paramsFilter);
            setDataSelect(dataFilter);
            setDataApiReturn(response);

            dispatch(statusSlice.actions.isPageLoadingChange(false));
        };
        fetch();
    }, []);
    useEffect(() => {
        setParamsFilter(searchParams.get('_filter'));
    }, [searchParams]);

    useEffect(() => {
        dispatch(sidebarSlice.actions.setIdSidebarActive(null)); // not active
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            <TitlePage title="Top Trending" sizes="large" data={dataSelect} />

            <div className={cx('buttons_seclect_national')}>
                {RenderButtonSelect(paramsFilter, onHandleSelectNational, isTrendingPage)}
            </div>
            <div className={cx('container_listsong_full')}>
                <RenderFullListSong data={dataSelect} />
            </div>
        </div>
    );
}

export default Trending;
