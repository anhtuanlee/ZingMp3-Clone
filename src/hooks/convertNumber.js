const convertNumber = (favorite) => {
    let result;
    if (favorite / 1000000000 >= 1) {
        result = (favorite / 1000000000).toString().split('.')[0] + 'B';
    } else {
        if (favorite / 1000000 >= 1) {
            result = (favorite / 1000000).toString().split('.')[0] + 'M';
        } else {
            if (favorite / 1000 >= 1) {
                result = (favorite / 1000).toString().split('.')[0] + 'K';
            }
        }
    }
    return result;
};

export default convertNumber;
