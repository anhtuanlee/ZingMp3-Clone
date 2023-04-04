import * as httpRequest from '../untils/request';

export const getUserLogin = async (email, password) => {
    const result = await httpRequest.post('/account/login/', {
        email: email,
        password: password,
    });
    return result;
};
export const setUserRegister = async (userName, passwordConfirm, email) => {
    const result = await httpRequest.post('/account/register/', {
        userName: userName,
        email: email,
        password: passwordConfirm,
    });
    return result;
};
export const getProfileUser = async (accessToken) => {
    const result = await httpRequest.get('/account/profile/', {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return result;
};

export const setSongFavoriteUser = async (accessToken, _id) => {
    // status error 
    const result = await httpRequest.post('/favorite/create', {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        id_music: _id,
    });
    return result;
};
