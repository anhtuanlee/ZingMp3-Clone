import * as httpRequest from '../untils/request';
export const SearchApi = async (query, limit = 10) => {
    const result = await httpRequest.get('search/', {
        params: {
            query: query,
            limit: limit,
        },
    });
    return result.data;
};
