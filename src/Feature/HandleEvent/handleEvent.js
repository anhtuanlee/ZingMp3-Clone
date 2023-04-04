import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Loading from '../../pages/Loading';
import {
    ALL_NATIONAL,
    BUTTON_RENDER_SELECT_NATIONAL,
    KPOP_NATIONAL,
    LOBAl,
    USUK_NATIONAL,
    VPOP_NATIONAL,
} from '../../redux/constant';
import { combinedStatusSelector } from '../../redux/selector';
import PlayListSong from '../PlayListSong';

// handle Filter song trending
export const handleFilterSongTrending = (data, paramsFilter) => {
    const dataFilter = data.filter((item) => {
        const category = item.slug_category;
        switch (paramsFilter) {
            case USUK_NATIONAL:
                return category === 'edm' || category === 'pop-au-my';
            case VPOP_NATIONAL:
                return category === 'nhac-tre';
            case KPOP_NATIONAL:
                return category === 'nhac-han';
            case LOBAl:
                return (
                    category === 'edm' ||
                    category === 'nhac-han' ||
                    category === 'pop-au-my'
                );
            case ALL_NATIONAL:
                return category;
            default:
                return category;
        }
    });
    return dataFilter;
};
export const RenderFullListSong = (
    data,
    isRank,
    HomePageTrending,
    containerRef,
    isListQueue,
) => {
    const { isLoadingPage } = useSelector(combinedStatusSelector);
    if (data.length === 0 || isLoadingPage) {
        const dataClone = new Array(6).fill();
        const result = dataClone.map((item, index) => {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: 10,
                    }}
                    key={index}
                >
                    <Loading
                        styles={{
                            height: '3vh',
                            borderRadius: 4,
                            margin: '5px 0',
                            width: '70%',
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                            width: '20%',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Loading styles={{ width: 20, height: 20, borderRadius: 1000 }} />

                        <Loading styles={{ width: 20, height: 20, borderRadius: 1000 }} />

                        <Loading styles={{ width: 20, height: 20, borderRadius: 1000 }} />
                    </div>
                    <Loading
                        key={index}
                        styles={{
                            height: '1vh',
                            borderRadius: 4,
                            margin: '5px 0',
                            width: '30%',
                            marginBottom: 25,
                        }}
                    />
                </div>
            );
        });
        return result;
    } else {
        const renderAllSong = data.map((song, index) => { 
            return (
                <div key={index}>
                    <PlayListSong
                        data={data}
                        song={song}
                        index={index}
                        rank={isRank}
                        HomePageTrending={HomePageTrending}
                        ref={containerRef}
                        isListQueue={isListQueue}
                    />
                </div>
            );
        });
        return renderAllSong;
    }
};

export const handleSelectButtonNational = (item) => {
    // handle Select Button to return type
    const nationalMap = {
        // fake to map with type no need used map
        [VPOP_NATIONAL]: VPOP_NATIONAL,
        [KPOP_NATIONAL]: KPOP_NATIONAL,
        [USUK_NATIONAL]: USUK_NATIONAL,
        [LOBAl]: LOBAl,
        [ALL_NATIONAL]: ALL_NATIONAL,
    };
    const type = item.type;

    return nationalMap[type];
};
export const RenderButtonSelect = (
    paramsFilter,
    onHandleSelectNational,
    isTrendingPage, // check page Trending will havent LOBAL
) => {
    const { isLoadingPage } = useSelector(combinedStatusSelector);

    // render button select national
    const result = BUTTON_RENDER_SELECT_NATIONAL.map((item, index) => {
        // clean code
        const isLocal = item.type === LOBAl;
        const isKPopOrUSUK = item.type === KPOP_NATIONAL || item.type === USUK_NATIONAL;
        const shouldRender = isTrendingPage ? !isLocal : !isKPopOrUSUK;

        if (shouldRender) {
            return isLoadingPage ? (
                <Loading
                    key={index}
                    styles={{ width: '8%', height: '2vh', margin: '0 5px' }}
                />
            ) : (
                <div key={index}>
                    <Button
                        className={item.type === paramsFilter ? 'isActive' : ''}
                        onHandle={() => onHandleSelectNational(item)}
                        text_border
                    >
                        {item.title}
                    </Button>
                </div>
            );
        }

        return null;
    });
    return result;
};
/*  const result = BUTTON_RENDER_SELECT_NATIONAL.map((item, index) => {
    code kieu ga
        if (isTrendingPage) {
            if (item.type !== LOBAl) {
                return (
                    <div key={index}>
                        <Button
                            className={
                                item.type === paramsFilter ? 'isActive' : ''
                            }
                            onHandle={() => onHandleSelectNational(item)}
                            text
                        >
                            {item.title}
                        </Button>
                    </div>
                );
            }
        } else {
            if (item.type !== KPOP_NATIONAL && item.type !== USUK_NATIONAL) {
                return (
                    <div key={index}>
                        <Button
                            className={
                                item.type === paramsFilter ? 'isActive' : ''
                            }
                            onHandle={() => onHandleSelectNational(item)}
                            text
                        >
                            {item.title}
                        </Button>
                    </div>
                );
            }
        }
    }); */
