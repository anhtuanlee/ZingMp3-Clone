import Tippy from '@tippyjs/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Headless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';

import Menu from '../../layouts/components/Menu';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    onHandle,
    // type
    circle,
    primary,
    text,
    text_border,
    circle_hide,
    typeSideBar,
    border,
    borderFixPlay,
    disable,
    active,
    effectHover,
    effectHoverReverse,
    border_nothover,
    modalControls,
    isListQueue,
    purplePrimary,
    //sizes
    sizes,
    // Icons,
    Icons,
    LeftIcons,
    RightIcons,
    //element
    href,
    to,
    children,
    //TippyCustom ,
    extraTitle,
    nestest,
    //css ,
    spederate,
    isLoading,
    className,
    ...passProps
}) {
    const [visiblecheck, setVisiblecheck] = useState(); // state visible
    const classnames = cx(
        'wrapper',
        {
            primary,
            circle,
            text,
            text_border,
            spederate,
            isLoading,
            circle_hide,
            border,
            border_nothover,
            borderFixPlay,
            disable,
            active,
            effectHover,
            effectHoverReverse,
            isListQueue,
            purplePrimary,
            modalControls,
            typeSideBar,
        },
        sizes,
        className,
    );

    let Comp = 'button';
    const props = { ...passProps };
    if (href) {
        props.href = href;
        Comp = 'a';
    } else if (to) {
        props.to = to;
        Comp = Link;
    }

    if (disable) {
        onHandle = () => {};
        extraTitle = false;
    }
    return typeof extraTitle === 'string' ? ( // when have extraTitlte, content will be extraTitle
        <Tippy duration={[100, 0]} content={extraTitle} zIndex={9999999}>
            <Comp className={classnames} {...props} onClick={onHandle}>
                {LeftIcons && (
                    <span className={cx('left_icon')}>
                        <LeftIcons />
                    </span>
                )}
                {Icons && (
                    <span>
                        <Icons />
                    </span>
                )}
                <span>{children}</span>
                {RightIcons && (
                    <span className={cx('right_icon')}>
                        <RightIcons />
                    </span>
                )}
            </Comp>
        </Tippy>
    ) : (
        <Headless
            // use tippy render when have nestest
            offset={[-160, 20]}
            render={(attrs) => {
                return (
                    <div className={cx('menu')} {...attrs} tabIndex="-1">
                        <Menu nestest={nestest} visible={visiblecheck} />
                    </div>
                );
            }}
        >
            <Comp
                onMouseEnter={() => {
                    // custom mouse move around button parent
                    if (nestest) {
                        setVisiblecheck(true);
                    }
                }}
                onMouseLeave={() => {
                    // custom mouse move around button parent
                    if (nestest) {
                        setVisiblecheck(false);
                    }
                }}
                className={classnames}
                {...props}
                onClick={onHandle}
            >
                {LeftIcons && (
                    <span className={cx('left_icon')}>
                        <LeftIcons />
                    </span>
                )}
                {Icons && (
                    <span className={cx('main_icon')}>
                        <Icons />
                    </span>
                )}
                <span className={cx('section_title')}> {children}</span>
                {RightIcons && (
                    <span className={cx('right_icon')}>
                        <RightIcons />
                    </span>
                )}
            </Comp>
        </Headless>
    );
}

Button.propTypes = {
    onHandle: PropTypes.func,
    circle: PropTypes.bool,
    primary: PropTypes.bool,
    text: PropTypes.bool,
    sizes: PropTypes.string,
    Icons: PropTypes.func,
    LeftIcons: PropTypes.func,
    RightIcons: PropTypes.func,
    href: PropTypes.string,
    to: PropTypes.string,
    children: PropTypes.node,
    extraTitle: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    nestest: PropTypes.object,
    className: PropTypes.string,
    spederate: PropTypes.bool,
    text_border: PropTypes.bool,
    circle_hide: PropTypes.bool,
    border: PropTypes.bool,
    borderFixPlay: PropTypes.bool,
    disable: PropTypes.bool,
    active: PropTypes.bool,
    effectHover: PropTypes.bool,
    effectHoverReverse: PropTypes.bool,
    border_nothover: PropTypes.bool,
    modalControls: PropTypes.bool,
    isListQueue: PropTypes.bool,
    purplePrimary: PropTypes.bool,
    isLoading: PropTypes.bool,
};
export default Button;
