import 'keen-slider/keen-slider.min.css';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { Link } from 'react-router-dom';
import styles from './Sliderslick.module.scss';
import classNames from 'classnames/bind';

import Images from '../../../components/Image';
import { BANNER_SLIDERS } from '../../../redux/constant';
import Arrow from './Arrow';
import { useSelector } from 'react-redux';
import { combinedStatusSelector } from '../../../redux/selector';
import Loading from '../../../pages/Loading';
import Media from 'react-media';

const cx = classNames.bind(styles);
function SliderSlick() {
    const [arrowShow, setArrowShow] = useState(false);
    const { isLoadingPage } = useSelector(combinedStatusSelector);

    const renderBanner = () => {
        const result = BANNER_SLIDERS.map((item, index) => {
            return (
                <div className={cx('card_banners')} key={index}>
                    <Link to={item.to}>
                        <div className={`keen-slider__slide number-slide${index + 1}`}>
                            <figure className={cx('banner_items')}>
                                <Images src={item.banner} />
                            </figure>
                        </div>
                    </Link>
                </div>
            );
        });
        return result;
    };

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            drag: false,

            slides: {
                perView: 3,
                spacing: 15,
            },
            breakpoints: {
                '(max-width: 480px)': {
                    slides: { perView: 1, spacing: 10 },
                    drag: true,
                },

                '(min-width: 481px)': {
                    slides: { perView: 2, spacing: 10 },
                },
                '(min-width: 1130px)': {
                    slides: { perView: 3, spacing: 15 },
                },
            },
        },
        [
            (slider) => {
                let timeout;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 2000);
                }

                slider.on('created', () => {
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true;
                        clearNextTimeout();
                        setArrowShow(true);
                    });
                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false;
                        nextTimeout();
                        setArrowShow(false);
                    });
                    nextTimeout();
                });

                slider.on('dragStarted', clearNextTimeout);
                slider.on('animationEnded', nextTimeout);
                slider.on('animationStarted', nextTimeout);
                slider.on('updated', nextTimeout);
                slider.on('destroyed', clearNextTimeout); // cleanup function
            },
        ],
    );
    return isLoadingPage ? (
        <Media
            queries={{
                small: '(max-width: 480px)',
                medium: '(min-width: 481px) and (max-width: 1199px)',
                large: '(min-width: 481px) and (min-width: 1200px)',
            }}
        >
            {(matches) => (
                <div>
                    {matches.large && (
                        <div style={{ display: 'flex', gap: 20, paddingTop: 32 }}>
                            <Loading styles={{ height: '25vh' }} />
                            <Loading styles={{ height: '25vh' }} />
                            <Loading styles={{ height: '25vh' }} />
                        </div>
                    )}

                    {matches.medium && (
                        <div style={{ display: 'flex', gap: 20, paddingTop: 32 }}>
                            <Loading styles={{ height: '25vh' }} />
                            <Loading styles={{ height: '25vh' }} />
                        </div>
                    )}
                    {matches.small && (
                        <div style={{ display: 'flex', gap: 20, paddingTop: 32 }}>
                            <Loading styles={{ height: '25vh' }} />
                        </div>
                    )}
                </div>
            )}
        </Media>
    ) : (
        <div className={cx('wrapper')}>
            <div ref={sliderRef} className="keen-slider">
                {arrowShow && (
                    <Arrow
                        left
                        onClick={(e) => {
                            e.stopPropagation() || instanceRef.current.prev();
                        }}
                    />
                )}

                {renderBanner()}

                {arrowShow && (
                    <Arrow
                        onClick={(e) => e.stopPropagation() || instanceRef.current.next()}
                    />
                )}
            </div>
        </div>
    );
}

export default SliderSlick;
