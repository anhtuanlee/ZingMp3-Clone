import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlayListSong from '../../../Feature/PlayListSong';
import { getTrendingDataApi } from '../../../services';
import styles from './Trending.module.scss';
const cx = classNames.bind(styles);
function Trending() {
    const [dataTrending, setDataTrending] = useState([]);

    const dataRenderTrending = () => {
        const result = dataTrending.map((song, index) => {
            return (
                <PlayListSong
                    song={song}
                    index={index}
                    data={dataTrending}
                    isTrendingMusic={true}
                    key={index} 
                />
            );
        });
        return result;
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await getTrendingDataApi(12).then((data) =>
                setDataTrending(data),
            );
            return response;
        };
        fetch();
    }, []);

    return (
        <div className={cx('wrapper ')}>
            <div className={cx('title_section')}>
                <h2>Trending</h2>
                <Link to='top-trending?_filter=all'>
                    <span>
                        TẤT CẢ
                        <span className={cx('chevon_right')}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                    </span>
                </Link>
            </div>
            <div className={cx('container_list_song')}>
                {dataRenderTrending()}
            </div>
        </div>
    );
}

export default Trending;
