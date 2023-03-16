import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Error.module.scss';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activeSidebar } from '../../redux/actions';
const cx = classNames.bind(styles); 
function ErrorPage() { 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(activeSidebar(null));
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box1')}></div>
            <div className={cx('box2')}></div>
            <div className={cx('box3')}></div>

            <div className={cx('content')}>
                <h1>:(</h1>
                <h2>
                    A <span>404</span> error occured, Page not found, check the
                    URL and try again.
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
