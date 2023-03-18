import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ButtonEffectPlay } from '../../components/Button';
import {
    handleFilterSongTrending,
    handleSelectButtonNational,
    renderButtonSelect,
    renderFullListSong,
} from '../../Feature/HandleEvent/handleEvent';
import { activeSidebar } from '../../redux/actions';
import { getTrendingDataApi } from '../../services';
import Loading from '../Loading';
import styles from './Trending.module.scss';
const cx = classNames.bind(styles);

function Trending() {
    const [dataApiReturn, setDataApiReturn] = useState([]); // take data from api
    const [dataSelect, setDataSelect] = useState([]); // filter data render from dataApi
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams(); // take params search url
    const [paramsFilter, setParamsFilter] = useState(() => {
        return searchParams.get('_filter'); // will return params first when reload page with data was set
    });
    const isPage = true; // check page or content

    const onHandleSelectNational = (item) => {
        const selectNational = handleSelectButtonNational(item);

        setSearchParams({
            _filter: selectNational,
        });
    };

    useEffect(() => {
        const dataFilter = handleFilterSongTrending(
            dataApiReturn,
            paramsFilter,
        );
        setDataSelect(dataFilter);
        setParamsFilter(paramsFilter);
    }, [paramsFilter]);

    useEffect(() => {
        const fetch = async () => {
            const result = await getTrendingDataApi(100).then((data) => {
                const dataFilter = handleFilterSongTrending(data, paramsFilter);
                setDataSelect(dataFilter);
                setDataApiReturn(data);
            });
            return result;
        };
        fetch();
    }, []);
    useEffect(() => {
        setParamsFilter(searchParams.get('_filter'));
    }, [searchParams]);

    useEffect(() => {
        dispatch(activeSidebar(null)); // not active
    }, []);

    return dataApiReturn.length === 0 ? (
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
                    Top Trending
                </span>
                <ButtonEffectPlay sizes="medium" />
            </h2>
            <div className={cx('buttons_seclect_national')}>
                {renderButtonSelect(
                    paramsFilter,
                    onHandleSelectNational,
                    isPage,
                )}
            </div>
            <div className={cx('container_listsong_full')}>
                {renderFullListSong(dataSelect)}
            </div>
        </div>
    );
}

export default Trending;
