import * as httpRequest from '../untils/request';

export const getSingerData = async (slug_name_singer) => {
    const result = await httpRequest.get('music/get-singer-name/', {
        params: {
            _singer: slug_name_singer,
        },
    });
    return result.data;
};
