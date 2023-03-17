import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button, { ButtonEffectPlay } from '../../components/Button';
import PlayListSong from '../../Feature/PlayListSong';
import { activeSidebar } from '../../redux/actions';
import {
    BUTTON_RENDER_SELECT_NATIONAL,
    KPOP_NATIONAL,
    USUK_NATIONAL,
    VPOP_NATIONAL,
} from '../../redux/constant';
import { getTrendingDataApi } from '../../services';
import Loading from '../Loading';
import styles from './Trending.module.scss';
const cx = classNames.bind(styles);

function Trending() {
    const [dataApiReturn, setDataApiReturn] = useState([]); // take data from api
    const [dataSelectNational, setDataSelect] = useState([]); // filter data render from dataApi
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams(); // take params search url
    const [paramsFilter, setParamsFilter] = useState(() => {
        return searchParams.get('_filter'); // will return params first when reload page with data was set
    });

    const onHandleSelectNational = (item) => {
        const type = item.type;
        switch (type) {
            case KPOP_NATIONAL:
                setSearchParams({
                    _filter: type,
                });
                break;
            case VPOP_NATIONAL:
                setSearchParams({
                    _filter: type,
                });
                break;
            case USUK_NATIONAL:
                setSearchParams({
                    _filter: type,
                });
                break;
            default:
                setSearchParams({
                    _filter: type,
                });
        }
    };

    useEffect(() => {
        const dataSelectFilter = dataApiReturn.filter((item) => {
            switch (paramsFilter) {
                case 'usuk':
                    return item.slug_category === 'edm' || 'pop-au-my';
                case 'vpop':
                    return item.slug_category === 'nhac-tre';
                case 'kpop':
                    return item.slug_category === 'nhac-han';
                default:
                    return item.slug_category;
            }
        });
        setDataSelect(dataSelectFilter);
        setParamsFilter(paramsFilter);
    }, [paramsFilter]);

    useEffect(() => {
        const fetch = async () => {
            const result = await getTrendingDataApi(100).then((data) => {
                setDataApiReturn(data);
                const dataSelectFilter = data.filter((item) => {
                    switch (paramsFilter) {
                        case 'usuk':
                            return (
                                item.slug_category === 'edm' ||
                                item.slug_category === 'pop-au-my'
                            );
                        case 'vpop':
                            return item.slug_category === 'nhac-tre';
                        case 'kpop':
                            return item.slug_category === 'nhac-han';
                        default:
                            return item.slug_category;
                    }
                });
                setDataSelect(dataSelectFilter);
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

    // render
    const renderFullListSong = () => {
        if (dataSelectNational) {
            const renderAllSong = dataSelectNational.map((song, index) => {
                return (
                    <PlayListSong
                        data={dataSelectNational}
                        song={song}
                        index={index}
                        key={index}
                    />
                );
            });
            return renderAllSong;
        } else {
            const renderAllSong = dataApiReturn.map((song, index) => {
                return (
                    <PlayListSong
                        data={dataApiReturn}
                        song={song}
                        index={index}
                        key={index}
                    />
                );
            });
            return renderAllSong;
        }
    };
    const renderButtonSelect = () => {
        const result = BUTTON_RENDER_SELECT_NATIONAL.map((item, index) => {
            return (
                <div key={index}>
                    <Button
                        className={item.type === paramsFilter ? 'isActive' : ''}
                        onHandle={() => onHandleSelectNational(item)}
                        text
                    >
                        {item.title}
                    </Button>
                </div>
            );
        });
        return result;
    };
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
                {renderButtonSelect()}
            </div>
            <div className={cx('container_listsong_full')}>
                {renderFullListSong()}
            </div>
        </div>
    );
}

export default Trending;
