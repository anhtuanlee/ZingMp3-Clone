import * as httpRequest from '../untils/request';

export const getMusicName = async (slug_name_music) => {
    const result = await httpRequest.get('music/get-music-name/', {
        params: {
            _name: slug_name_music,
        },
    });
    return result.data;
};
