import * as httpRequest from '../untils/request';

export const getMusicTopView = async (limit, page = 0) => {
    const result = await httpRequest.get('/music/top-views/', {
        params: {
            _limit: limit,
            _page: page, 
        },
    });
    return result.data;
};
