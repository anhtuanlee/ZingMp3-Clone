import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { combinedStatusSelector } from '../../redux/selector';
import { statusSlice } from '../../redux/sliceReducer';
import Button from '../Button';
import styles from './ListQueue.module.scss';
import { RenderFullListSong } from '../../Feature/HandleEvent';
import TitlePage from '../../layouts/TitlePage/TitlePage';
const cx = classNames.bind(styles);

function ListQueue() {
    const listQueueRef = useRef();
    const { dataSongs, isContentHide, isMvPlayer } = useSelector(combinedStatusSelector);
    return (
        <div className={cx('wrapper', isContentHide && !isMvPlayer ? 'hide' : '')}>
            <div className={cx('container')}>
                <div className={cx('title_container')}>
                    <TitlePage
                        title="Danh Sách Phát"
                        sizes="medium"
                        data={dataSongs}
                        styles={{ fontSize: 20 }}
                    />
                </div>

                <div className={cx('list_queue')} ref={listQueueRef} id="container">
                    {RenderFullListSong(dataSongs, undefined, undefined, listQueueRef)}
                </div>
            </div>
        </div>
    );
}

export default ListQueue;
