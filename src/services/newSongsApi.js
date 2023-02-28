import * as httpRequest from '../untils/request';

export const newSongApi = async (limit = 50, page = 1) => {
    const result = await httpRequest.get('music/new-music/', {
        params: { 
            _limit: limit,
            _page: page,
        },
    });
    return result.data;
};
