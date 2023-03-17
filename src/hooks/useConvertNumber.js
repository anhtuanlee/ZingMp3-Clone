

export const useConvertNumber = (favorite) => {
    let result;
    if (favorite / 1000000000 >= 1) {
        result = (favorite / 1000000000).toString().slice(0, 4) + 'B';
    } else {
        if (favorite / 1000000 >= 1) {
            result = (favorite / 1000000).toString().slice(0, 4) + 'M';
        } else {
            if (favorite / 1000 >= 1) {
                result = (favorite / 1000).toString().slice(0, 4) + 'K';
            }
        }
    }
    return result;
};
