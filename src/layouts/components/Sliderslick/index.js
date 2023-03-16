import 'keen-slider/keen-slider.min.css';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { Link } from 'react-router-dom';
import styles from './Sliderslick.module.scss';
import classNames from 'classnames/bind';

import Images from '../../../components/Image';
import { BANNER_SLIDERS } from '../../../redux/constant';
import Arrow from './Arrow';

const cx = classNames.bind(styles);
function SliderSlick() {
    const [arrowShow, setArrowShow] = useState(false);
    const renderBanner = BANNER_SLIDERS.map((item, index) => {
        return (
            <div className={cx('card_banners')} key={index}>
                <div className={`keen-slider__slide number-slide${index + 1}`}>
                    <Link to={item.to}>
                        <figure className={cx('banner_items')}>
                            <Images src={item.banner} />
                        </figure>
                    </Link>
                </div>
            </div>
        );
    });

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            drag: false,
            slides: {
                perView: 3,
                spacing: 15,
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

    return (
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

                {renderBanner}

                {arrowShow && (
                    <Arrow
                        onClick={(e) =>
                            e.stopPropagation() || instanceRef.current.next()
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default SliderSlick;
