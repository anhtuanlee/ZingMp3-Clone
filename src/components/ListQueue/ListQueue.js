import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RenderFullListSong } from '../../Feature/HandleEvent';
import TitlePage from '../../layouts/components/TitlePage/TitlePage';
import { combinedStatusSelector } from '../../redux/selector';
import styles from './ListQueue.module.scss';
const cx = classNames.bind(styles);

function ListQueue() {
    const listQueueRef = useRef();
    const isListQueue = true;
    const { dataSongs, isContentHide, isMvPlayer } = useSelector(combinedStatusSelector); 

    return (
        <div className={cx('wrapper', isContentHide && !isMvPlayer ? 'hide' : '')}>
            <div className={cx('title_container')}>
                <TitlePage
                    title="Danh Sách Phát"
                    sizes="medium"
                    data={dataSongs}
                    styles={{ fontSize: 20 }}
                />
            </div>

            <div className={cx('list_queue')} ref={listQueueRef} id="container">
                <RenderFullListSong
                    data={dataSongs }
                    containerRef={listQueueRef}
                    isListQueue={isListQueue}
                />
            </div>
        </div>
    );
}

export default ListQueue;