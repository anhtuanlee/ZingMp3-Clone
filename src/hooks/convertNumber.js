const convertNumber = (favorite) => { 
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;
    let result;
    if (favorite / billion >= 1) {
        const listSplit = (favorite / billion).toString().split('.');
        result = `${listSplit[0]}.${listSplit[1].slice(0, 1)}B`;
    } else {
        if (favorite / million >= 1) {
            const listSplit = (favorite / million).toString().split('.'); 
            result = `${listSplit[0]}${
                Number(listSplit[1].slice(0, 1)) > 0 ? '.' + listSplit[1].slice(0, 1) : ''
            }M`;
        } else {
            if (favorite / thousand >= 1) {
                const listSplit = (favorite / thousand).toString().split('.');
                result = `${listSplit[0]}K`;
            } else {
                result = favorite
            }
        }
    }
    return result;
};

export default convertNumber;
