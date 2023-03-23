import Button from '../../components/Button';
import {
    ALL_NATIONAL,
    BUTTON_RENDER_SELECT_NATIONAL,
    KPOP_NATIONAL,
    LOBAl,
    USUK_NATIONAL,
    VPOP_NATIONAL,
} from '../../redux/constant';
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
                return (
                    category === 'nhac-tre' ||
                    category === 'pop-au-my' ||
                    category === 'edm'
                );
            default:
                return category;
        }
    });
    return dataFilter;
};
export const renderFullListSong = (
    data,
    isRank,
    HomePageTrending,
    containerRef,
) => {
    if (data) { 
    const renderAllSong = data.map((song, index) => {
            return (
                <PlayListSong
                    data={data}
                    song={song}
                    index={index}
                    key={index}
                    rank={isRank}
                    HomePageTrending={HomePageTrending}
                    ref={containerRef}
                />
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
export const renderButtonSelect = (
    paramsFilter,
    onHandleSelectNational,
    isTrendingPage, // check page Trending will havent LOBAL
) => {
    // render button select national
    const result = BUTTON_RENDER_SELECT_NATIONAL.map((item, index) => {
        // clean code
        const isLocal = item.type === LOBAl;
        const isKPopOrUSUK =
            item.type === KPOP_NATIONAL || item.type === USUK_NATIONAL;
        const shouldRender = isTrendingPage ? !isLocal : !isKPopOrUSUK;

        if (shouldRender) {
            return (
                <div key={index}>
                    <Button
                        className={item.type === paramsFilter ? 'isActive' : ''}
                        onHandle={() => onHandleSelectNational(item)}
                        text
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
