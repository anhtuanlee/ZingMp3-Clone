import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { sidebarSlice } from '../../redux/sliceReducer';
import Button from '../../components/Button';
import styles from './Error.module.scss';

const cx = classNames.bind(styles);

function ErrorPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(sidebarSlice.actions.setIdSidebarActive(null));
    }, [dispatch]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box1')}></div>
            <div className={cx('box2')}></div>
            <div className={cx('box3')}></div>

            <div className={cx('content')}>
                <h1>:(</h1>
                <h2>
                    A <span>404</span> error occured, Page not found, check the URL and
                    try again.
                </h2>
                <h3 className={cx('btn-return')}>
                    <Link to="/">
                        <Button primary sizes="big">
                            Return to home
                        </Button>
                    </Link>
                </h3>
            </div>
        </div>
    );
}

export default ErrorPage;
