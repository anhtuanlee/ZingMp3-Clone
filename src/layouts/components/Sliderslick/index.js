import images from '../../../assets';
import Images from '../../../components/Image';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Link } from 'react-router-dom';

import Arrow from './Arrow';
import styles from './Sliderslick.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function SliderSlick() {
    const img = images.bannerSlider;
    const [arrowShow, setArrowShow] = useState(false);
    const renderBanner = img.map((item, index) => {
        return (
            <div className={cx('card_banners')} key={index}>
                <div className={`keen-slider__slide number-slide${index + 1}`}>
                    <Link to="/">
                        <figure className={cx('banner_items')}>
                            <Images src={item} />
                        </figure>
                    </Link>
                </div>
            </div>
        );
    });

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            mode: 'free',
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
                            console.log(sliderRef.current);
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
