import Tippy from '@tippyjs/react';
import Headless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import Menu from '../../layouts/components/Menu';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
    onHandle,
    // type
    circle,
    primary,
    text,
    circle_hide,
    border,
    borderFixPlay,
    disable,
    active,
    effectHover,
    effectHoverReverse,
    border_nothover,
    //sizes
    sizes,
    // Icons,
    Icons,
    LeftIcons,
    RightIcons = false,
    //element
    href = false,
    to = false,
    children,
    //TippyCustom ,
    extraTitle = false,
    nestest,
    //css ,
    spederate = false,
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
    return extraTitle ? ( // when have extraTitlte, content will be extraTitle
        <Tippy duration={[100, 0]} content={extraTitle}>
            <Comp className={classnames} {...props} onClick={onHandle}>
                {LeftIcons && (
                    <span className={cx('left_icon')}>
                        <LeftIcons />
                    </span>
                )}
                {Icons && <Icons className={cx('main_icon')} />}
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
                {Icons && <Icons className={cx('main_icon')} />}
                <span>{children}</span>
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
    extraTitle: PropTypes.string,
    nestest: PropTypes.object,
    className: PropTypes.string,
    spederate: PropTypes.bool,
};
export default Button;
