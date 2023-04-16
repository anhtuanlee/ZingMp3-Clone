import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { faSearch, faXmark } from '@cseitz/fontawesome-svg-light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlayListSong from '../../Feature/PlayListSong';
import { AccountPropose } from '../Propose';
import { SearchApi } from '../../services';
import { useDebounce } from '../../hooks';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { Loading } from '../Icons';

const cx = classNames.bind(styles);

function Search({ visibleHeaderMobile, handleSearchForm }) {
    const [value, setValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState();
    const debounce = useDebounce(value, 500);
    const containerRef = useRef();
    useEffect(() => {
        const Fetch = async () => {
            if (value) {
                setLoadingSearch(true);
                const result = await SearchApi(debounce).then((data) => {
                    value && setSearchResult(data);
                    setLoadingSearch(false);
                });
                return result;
            }
        };
        Fetch();
    }, [debounce]);
    // handle Event
    const handleType = (e) => {
        setValue(e.target.value);

        if (!e.target.value) {
            setSearchResult([]);
        }
    };
    const handleFocus = (e) => {
        setVisible(true);
    };

    const handleOffResult = (e) => {
        if (containerRef?.current) {
            if (containerRef.current?.contains(e.target)) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }
    };

    const handleClear = () => {
        setValue('');
        setSearchResult([]);
        setVisible(true);
    };

    useEffect(() => {
        window.addEventListener('click', (e) => handleOffResult(e));
        return () => window.removeEventListener('click', (e) => handleOffResult(e));
    }, [visible, containerRef.current]);
    return (
        <div className={cx('wrapper')} ref={containerRef}>
            <div
                className={cx(
                    'search_input',
                    visible || visibleHeaderMobile ? 'isCollap' : '',
                )}
            >
                <FontAwesomeIcon icon={faSearch} className={cx('button_search')} />
                <input
                    value={value}
                    onFocus={(e) => handleFocus(e)}
                    onChange={(e) => handleType(e)}
                    placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                />
                {value && !loadingSearch && (
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={handleClear}
                        className={cx('button_close')}
                    />
                )}
                {loadingSearch && (
                    <div className={cx('button_loading')}>
                        <Loading />
                    </div>
                )}

                {(visible || visibleHeaderMobile) && (
                    <div className={cx('result_search')}>
                        {/* kiểm tra mảng có phần tử mới gửi dữ liệu qua Account */}
                        <h4 className={cx('result_title')}>
                            {searchResult.length > 0
                                ? 'Gợi ý kết quả'
                                : 'Nhập thông tin tìm kiếm'}
                        </h4>
                        {searchResult.length > 0 && (
                            <AccountPropose
                                onHandle={
                                    visibleHeaderMobile
                                        ? handleSearchForm
                                        : handleOffResult
                                }
                                data={searchResult ? searchResult : undefined}
                            />
                        )}
                        {searchResult.map((item, index) => {
                            return (
                                <PlayListSong
                                    song={item}
                                    index={index}
                                    key={index}
                                    data={searchResult}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(Search);

Search.propTypes = {
    visibleHeaderMobile: PropTypes.bool,
    handleSearchForm: PropTypes.bool,
};
