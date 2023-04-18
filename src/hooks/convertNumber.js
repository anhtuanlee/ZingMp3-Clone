const convertNumber = (favorite) => {
    let result;
    if (favorite / 1000000000 >= 1) {
        const listSplit = (favorite / 1000000000).toString().split('.');
        result = `${listSplit[0]}.${listSplit[1].slice(0, 1)}B`;
    } else {
        if (favorite / 1000000 >= 1) {
            const listSplit = (favorite / 1000000).toString().split('.');
            result = `${listSplit[0]}.${listSplit[1].slice(0, 1)}M`;
        } else {
            if (favorite / 1000 >= 1) {
                const listSplit = (favorite / 1000).toString().split('.');
                result = `${listSplit[0]}K`;
            }
        }
    }
    return result;
};

export default convertNumber;
