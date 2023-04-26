import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import RenderRadio from '../../Feature/RenderRadio';
import Button from '../../components/Button/Button';
import Container from '../../components/Container';
import TitlePage from '../../layouts/components/TitlePage/TitlePage';
import { sidebarSlice, statusSlice } from '../../redux/sliceReducer';
import getRadioApi from '../../services/getRadioApi';
import styles from './Radio.module.scss';
import { ArrowChevonLeft, ArrowChevonRight } from '../../components/Icons';

const cx = classNames.bind(styles);

function Radio() {
    const [categoryRadio, setCategoryRadio] = useState([]);
    const [isListChange, setList] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(sidebarSlice.actions.setIdSidebarActive(2));
        dispatch(statusSlice.actions.isPageLoadingChange(true));
        const fetchNewSong = async () => {
            const result = await getRadioApi();
            setCategoryRadio(result);
            dispatch(statusSlice.actions.isPageLoadingChange(false));
        };
        fetchNewSong();
    }, []);

    const Render = () => {
        const dataRender = categoryRadio;
        if (dataRender.length > 0) {
            const result = dataRender.map((item, index) => {
                if (
                    item.sectionType !== 'Radio_Schedule' &&
                    item.sectionType !== 'podcast_category' // img error
                ) {
                    return (
                        <div className={cx('inner')} key={index}>
                            <h2>{item?.title}</h2>
                            {item.sectionType === 'livestream' && (
                                <div>
                                    <Button
                                        className={cx(
                                            'btn_chevon',
                                            'left',
                                            !isListChange && 'disable',
                                        )}
                                        Icons={ArrowChevonLeft}
                                        circle
                                        onHandle={() => setList(false)}
                                    />
                                    <Button
                                        circle
                                        className={cx(
                                            'btn_chevon',
                                            'right',
                                            isListChange && 'disable',
                                        )}
                                        Icons={ArrowChevonRight}
                                        onHandle={() => setList(true)}
                                    />
                                </div>
                            )}
                            {item.sectionType === 'livestream' ? (
                                <div
                                    className={cx(
                                        'container_section',
                                        isListChange ? 'next' : 'prev',
                                    )}
                                >
                                    <RenderRadio dataFull={item} isLoading={false} />
                                </div>
                            ) : (
                                <Container listData={item.items} isPodcast />
                            )}
                        </div>
                    );
                }
            });
            return result;
        }
    };
    return (
        <div className={cx('wrapper')}>
            <TitlePage title="Radio" className={cx('title_section')} />

            {categoryRadio.length > 0 ? (
                <div className={cx('container')}>{Render()}</div>
            ) : (
                <div className={cx('container_loading')}>
                    <RenderRadio isLoading={true} /> 
                </div>
            )}
        </div>
    );
}

export default Radio;
