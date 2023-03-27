import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { combinedStatusSelector } from '../../redux/selector';
import { themeSlice } from '../../redux/sliceReducer';
import styles from './ModalTheme.module.scss';
import Button from '../../components/Button';
import { Close } from '../Icons';
import ModalItem from './ModalItem';
import { useState } from 'react';
const cx = classNames.bind(styles);

function ModalTheme() {
    const dispatch = useDispatch();
    const [themeTest, setThemeTest] = useState(false);

    const handleTurnOffModal = () => {
        setThemeTest(true);
        setTimeout(() => {
            dispatch(themeSlice.actions.setIsModalTheme(false));
        }, 0);
    };

    const MENU_THEME_LIST = {
        artist: [
            {
                title: 'Ganyu',
                cardArtist: require('../../assets/images/LisTheme/card_artist/card_theme_ganyu.png'),
                properties: {
                    backgroundImg: require('../../assets/images/LisTheme/img-background_ganyu.png'),
                    colorPrimary: '#1A3570',
                    textHover: '#4C7CFF',
                    layoutBg: 'tranparent',
                    layoutHeaderBg: '#061c4fcc',
                    playerBg: '#061641',
                    primaryBg: '#1A3570',
                    textPrimary: '#fff',
                    textSecondary: 'hsla(0,0%,100%,0.5)',
                    purplePrimary: '#3560F5',
                    newSongLayout: 'tranparent',
                    borderPlayer: 'rgba(0,0,0,0.25)',
                    backgrondSize: 'cover',
                },
            },
            {
                title: 'Mặc định',
                cardArtist:
                    'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/purple.jpg',
                properties: {
                    colorPrimary: '#170f23',
                    textHover: '#c273ed',
                    layoutBg: '#170f23',
                    sidebarBg: '#231b2e',
                    layoutHeaderBg: 'rgba(23, 15, 35, 0.666)',
                    playerBg: '#130c1c',
                    primaryBg: '#34224f',
                    textPrimary: '#fff',
                    textSecondary: 'hsla(0, 0%, 100%, 0.5)',
                    purplePrimary: '#9b4de0',

                    newSongLayout:
                        'url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.9/static/media/new-release-bg.73d8f976.jpg)',
                    borderPlayer: 'hsla(0,0%,100%,0.1)',
                },
            },
            {
                title: 'Jack',
                cardArtist: require('../../assets/images/LisTheme/card_artist/card_theme_jack.jpg'),
                properties: {
                    backgroundImg: require('../../assets/images/LisTheme/img-background_jack.jpg'),
                    colorPrimary: '#D08011',
                    textHover: '#F59D22',
                    playerBg: '#4C473E',
                    layoutHeaderBg: '#767269cc',
                    layoutBg: 'tranparentent',
                    primaryBg: '#605C52',
                    textPrimary: '#FFFF',
                    textSecondary: 'hsla(0,0%,100%,0.5)',
                    purplePrimary: '#D08011',
                    newSongLayout: 'tranparent',
                    borderPlayer: 'rgba(0,0,0,0.05)',
                },
            },

            {
                title: 'Jennie',
                cardArtist: require('../../assets/images/LisTheme/card_artist/card_theme_jennie.jpg'),
                properties: {
                    backgroundImg: require('../../assets/images/LisTheme/img-background_jennie.jpg'),
                    colorPrimary: '#BBB9C4',
                    textHover: '#6F1F89',
                    layoutBg: 'tranparent',
                    layoutHeaderBg: '#bbb9c4cc',
                    playerBg: '#C6C4D1',
                    primaryBg: '#CAC6DD',
                    textPrimary: '#32323d',
                    textSecondary: '#696969',
                    purplePrimary: '#8919AE',
                    newSongLayout: 'tranparent',
                    borderPlayer: 'rgba(0,0,0,0.05)',
                },
            },
            {
                title: 'Jisoo',
                cardArtist: require('../../assets/images/LisTheme/card_artist/card_theme_jiiso.jpg'),
                properties: {
                    backgroundImg: require('../../assets/images/LisTheme/img-background_jisoo.jpg'),
                    colorPrimary: '#8D22C3',
                    textHover: '#8D22C3',
                    layoutBg: 'tranparent',
                    layoutHeaderBg: 'rgb(241, 221, 216, 0.8)',
                    playerBg: '#F5E6E0',
                    primaryBg: '#FFFF',
                    textPrimary: '#32323d',
                    textSecondary: 'rgba(0,0,0,0.6)',
                    purplePrimary: '#8D22C3',
                    newSongLayout: 'tranparent',
                    borderPlayer: 'rgba(0,0,0,0.05)',
                },
            },
            {
                title: 'Rose',
                cardArtist: require('../../assets/images/LisTheme/card_artist/card_theme_rose.jpg'),
                properties: {
                    backgroundImg: require('../../assets/images/LisTheme/img-background_rose.jpg'),
                    colorPrimary: '#1A3570',
                    textHover: '#4C7CFF',
                    layoutBg: 'tranparent',
                    layoutHeaderBg: '#061c4fcc',
                    playerBg: '#061641',
                    primaryBg: '#1A3570',
                    textPrimary: '#fff',
                    textSecondary: 'hsla(0,0%,100%,0.5)',
                    purplePrimary: '#3560F5',
                    newSongLayout: 'tranparent',
                    borderPlayer: 'rgba(0,0,0,0.05)',
                },
            },
            {
                title: 'IU',
                cardArtist: require('../../assets/images/LisTheme/card_artist/card_theme_iu.jpg'),
                properties: {
                    backgroundImg: require('../../assets/images/LisTheme/img-background_ui.jpg'),
                    colorPrimary: '#EFEDEB',
                    textHover: '#AC3E82',

                    layoutBg: 'tranparent',
                    layoutHeaderBg: 'rgb(241, 221, 216, 0.8)',
                    playerBg: '#F5E6E0',
                    primaryBg: '#F9E6E2',
                    textPrimary: '#000',
                    textSecondary: '#696969',
                    purplePrimary: '#C24793',
                    newSongLayout: 'tranparent',
                    borderPlayer: 'rgba(0,0,0,0.05)',
                },
            },
            {
                title: 'Lisa',
                cardArtist: require('../../assets/images/LisTheme/card_artist/card_theme_lisa.jpg'),
                properties: {
                    backgroundImg: require('../../assets/images/LisTheme/img-background_lisa.jpg'),
                    colorPrimary: '##D14781',
                    textHover: '#CC3373',
                    layoutBg: 'tranparent',
                    layoutHeaderBg: 'rgb(241, 221, 216, 0.8)',
                    playerBg: '#F4CBCA',
                    primaryBg: '#F9E6E2',
                    textPrimary: '#32323d',
                    textSecondary: '#696969',
                    purplePrimary: '#D14781',
                    newSongLayout: 'tranparent',
                    borderPlayer: 'rgba(0,0,0,0.05)',
                },
            },
        ],
    };
    const handleStop = (e) => {};
    const renderListTheme = () => {
        const result = MENU_THEME_LIST.artist.map((item, index) => {
            return <ModalItem item={item} key={index} themeTest={themeTest} />;
        });
        return result;
    };

    return (
        <div className={cx('wrapper')} /*  onClick={handleTurnOffModal} */>
            <div className={cx('theme_modal')}>
                <div className={cx('main_title')}>
                    <h1>Giao Diện</h1>
                    <span>
                        <Button
                            extraTitle="Đóng"
                            Icons={Close}
                            className={cx('btn_close')}
                            onHandle={handleTurnOffModal}
                        />
                    </span>
                </div>
                <div className={cx('container')}>
                    <div>
                        <h2>Nghệ Sĩ</h2>
                        <div
                            className={cx('section_theme_list')}
                            onClick={(e) => handleStop}
                        >
                            {renderListTheme()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalTheme;
