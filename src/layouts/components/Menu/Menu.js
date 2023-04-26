import { useState } from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import { convertNumber, useLogout } from '../../../hooks';
import Images from '../../../components/Image';
import { Eyes, Heart } from '../../../components/Icons';
import { featureSlice, loginSlice } from '../../../redux/sliceReducer';

const cx = classNames.bind(styles);
function Menu({
    items = [],
    children,
    visible = false,
    placement = 'bottom',
    nestest,
    className,
    isListQueue,
    song,
    ...props
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visiblecheck, setVisible] = useState(false); /* 
    const [currentItem, setCurrentItem] = useState([{ data: items }]); */
    const currentItem = [{ data: items }];
    const lastItemMenu = currentItem[currentItem.length - 1];
    const favorite = convertNumber(song?.favorite);
    const view = convertNumber(song?.view);
 
    const handleClick = () => {
        if (!nestest) {
            setVisible(!visiblecheck);
        }
    };
    const handleClickOutSide = () => {
        setVisible(false);
    };
    //render lists menu
    const listRender = nestest ? nestest : lastItemMenu;
    const handleDownloadSong = () => {
        const url = song?.src_music;
        const fileName = `${song?.name_music}`;
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                saveAs(blob, fileName);
                toast.success('Tải xuống thành công')
            });
    };

    const onHandle = (e, item) => {
        switch (item.type) {
            case 'logout':
                navigate('..');
                dispatch(loginSlice.actions.setListSongFavorite([]));
                dispatch(loginSlice.actions.setAccessToken(''));
                toast.info('Đăng xuất thành công')
                break;
            case 'dowload':
                e.stopPropagation();
                handleDownloadSong();
                break;
            default:
                console.log('default');
        }
    };
    const resultSetting = listRender.data.map((item, index) => {
        return <MenuItem key={index} data={item} onHandle={(e) => onHandle(e, item)} />;
    });
    const handleResult = (attrs) => {
        return (
            <div className={cx('wrapper', className)} {...attrs} tabIndex="-1">
                {/* if have song will is more select */}
                {song && (
                    <div>
                        <div className={cx('title_song')}>
                            <figure className={cx('img_song')}>
                                <Images src={song.image_music} />
                            </figure>
                            <div className={cx('info_song')}>
                                <span className={cx('name_song')}>{song.name_music}</span>
                                <div className={cx('title_extra')}>
                                    <span className={cx('icon_heart')}>
                                        <Heart /> {favorite}
                                    </span>
                                    <span className={cx('icon_view')}>
                                        <Eyes /> {view}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <ul className={cx('menu_items')}>{resultSetting}</ul>
            </div>
        );
    };
    return (
        <Tippy
            interactive
            appendTo={document.body}
            visible={visible || visiblecheck}
            delay={[1000, 100]}
            zIndex={99999}
            placement={placement}
            offset={song ? (isListQueue ? [20, 20] : [20, 150]) : []} // check is menu of song playlist
            {...props}
            onClickOutside={handleClickOutSide}
            render={handleResult}
        >
            <span onClick={handleClick}>{children}</span>
        </Tippy>
    );
}
Menu.propTypes = {
    onHandle: PropTypes.func,
    items: PropTypes.array,
    children: PropTypes.node,
    visible: PropTypes.bool,
    nestest: PropTypes.object,
    song: PropTypes.object,
    placement: PropTypes.string,
    className: PropTypes.string,
    isListQueue: PropTypes.bool,
};
export default Menu;
