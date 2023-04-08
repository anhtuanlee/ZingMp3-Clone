import React, { useEffect, useState } from 'react';
import { faSearch, faXmark } from '@cseitz/fontawesome-svg-light';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDebounce } from '../../hooks';
import { SearchApi } from '../../services';
import { AccountPropose } from '../Propose';
import PlayListSong from '../../Feature/PlayListSong';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Loading } from '../Icons';

const cx = classNames.bind(styles);

function Search() {
    const [value, setValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState();
    const debounce = useDebounce(value, 500);
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
    console.log('loading', loadingSearch);
    // handle Event
    const handleType = (e) => {
        setValue(e.target.value);

        if (!e.target.value) {
            setSearchResult([]);
        }
    };
    const handleFocus = () => {
        setVisible(true);
    };
    const handleOffResult = () => {
        setVisible(false);
    };

    const handleClear = () => {
        setValue('');
        setSearchResult([]);
        setVisible(true);
    };
    return (
        <Tippy
            interactive
            visible={visible}
            onClickOutside={handleOffResult}
            offset={[0, 0]}
            render={(attrs) => {
                return (
                    <div className={cx('result_search')} {...attrs} tabIndex="-1">
                        {/* kiểm tra mảng có phần tử mới gửi dữ liệu qua Account */}
                        <h4 className={cx('result_title')}>
                            {searchResult.length > 0
                                ? 'Gợi ý kết quả'
                                : 'Nhập thông tin tìm kiếm'}
                        </h4>
                        {searchResult.length > 0 && (
                            <AccountPropose
                                onHandle={handleOffResult}
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
                                    onHandle={handleOffResult}
                                />
                            );
                        })}
                    </div>
                );
            }}
        >
            <div className={cx('wrapper')}>
                <div className={cx('search_input', visible === true ? 'isCollap' : '')}>
                    <FontAwesomeIcon icon={faSearch} className={cx('button_search')} />
                    <input
                        value={value}
                        onFocus={handleFocus}
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
                </div>
            </div>
        </Tippy>
    );
}

export default React.memo(Search);
