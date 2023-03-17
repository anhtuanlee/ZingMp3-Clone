import * as httpRequest from '../untils/request';

export const getSingerDataApi = async (slug_name_singer, limit) => {
    const result = await httpRequest.get('music/get-singer-name/', {
        params: {
            _singer: slug_name_singer,
            _limit: limit,
        },
    });
    return result.data;
};
