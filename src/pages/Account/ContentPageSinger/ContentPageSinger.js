import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../../Loading';
import styles from '../Account.module.scss';
import { ArrowChevonRight } from '../../../components/Icons';
import { combinedStatusSelector } from '../../../redux/selector';
import { RenderFullListSong } from '../../../Feature/HandleEvent/handleEvent';
const cx = classNames.bind(styles);

function ContentPageSinger({ data }) {
    const { isLoadingPage } = useSelector(combinedStatusSelector);
    const userSinger = data[data.length - 1]?.slug_name_singer;

    return (
        <div className={cx('content_account_page')}>
            <div className={cx('container_songs_popular')}>
                {/* title_section */}
                {isLoadingPage ? (
                    <Loading styles={{ height: '6vh', width: '40%', marginBottom: 25 }} />
                ) : (
                    <div className={cx('title_section')}>
                        <h3 className={cx('title_main')}>Bài Hát Nổi Bật</h3>
                        <Link to="album" state={userSinger}>
                            {/* clean code */}
                            <span className={cx('list_songs_section')}>
                                <span>TẤT CẢ</span>
                                <ArrowChevonRight />
                            </span>
                        </Link>
                    </div>
                )}
                {/* list songs */}
                <div className={cx('list_songs')}>
                    <RenderFullListSong data={data} />
                </div>
            </div>
        </div>
    );
}

export default ContentPageSinger;

ContentPageSinger.propTypes = {
    data: PropTypes.array,
};
