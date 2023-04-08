import * as httpRequest from '../untils/request';

export const getMusicTop = async (limit = 100, page) => {
    const result = await httpRequest.get('./music/top-favorite', {
        params: {
            _limit: limit,
            _page: page,
        },
    });
    return result.data;
};
