import Media from 'react-media';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Loading from '../../Loading';
import styles from '../Account.module.scss';
import Images from '../../../components/Image';
import { combinedStatusSelector } from '../../../redux/selector';
import TitlePage from '../../../layouts/components/TitlePage/TitlePage';

const cx = classNames.bind(styles);

function HeaderPageSinger({ data = [] }) {
    const { isLoadingPage } = useSelector(combinedStatusSelector);

    const singer_info = data[data.length - 1];
    const follower = singer_info?.favorite.toLocaleString();

    const ComponentLoading = () => {
        return (
            <Media query="(max-width: 600px)">
                {(matches) => {
                    return matches ? (
                        <header
                            className={cx('header_box')}
                            style={{
                                display: ' flex',
                                flexDirection: 'column',
                                marginBottom: 20,
                            }}
                        >
                            <Loading
                                styles={{
                                    width: 80,
                                    paddingBottom: 80,
                                    borderRadius: 1000,
                                }}
                            />
                            <div
                                style={{
                                    width: '90%',
                                    marginTop: 15,
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                <Loading
                                    styles={{
                                        width: '60%',
                                        height: '3vh',
                                        marginBottom: 20,
                                    }}
                                />
                                <Loading styles={{ width: '40%', height: '2vh' }} />
                            </div>
                        </header>
                    ) : (
                        <header
                            className={cx('header_box')}
                            style={{
                                display: ' flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: 30,
                                marginBottom: 20,
                            }}
                        >
                            <Loading
                                styles={{
                                    width: 140,
                                    paddingBottom: 140,
                                    borderRadius: 100,
                                }}
                            />
                            <div style={{ width: '70%', marginTop: 15 }}>
                                <Loading
                                    styles={{
                                        width: '60%',
                                        height: '6vh',
                                        marginBottom: 20,
                                    }}
                                />
                                <Loading styles={{ width: '40%', height: '4vh' }} />
                            </div>
                        </header>
                    );
                }}
            </Media>
        );
    };
    return isLoadingPage ? (
        <ComponentLoading />
    ) : (
        <header className={cx('header_box')}>
            <div className={cx('box_singer')}>
                <Images src={singer_info?.image_music} className={cx('image_singer')} />

                <div className={cx('singer_info')}>
                    <TitlePage
                        title={`${singer_info?.name_singer}`}
                        data={data}
                        sizes="large"
                    />
                    <span className={cx('extra_title')}>{follower} người quan tâm</span>
                </div>
            </div>
        </header>
    );
}

export default HeaderPageSinger;

HeaderPageSinger.propTypes = {
    data: PropTypes.array,
};
