import { useState } from 'react';
import {
    KPOP_NATIONAL,
    LOBAl,
    USUK_NATIONAL,
    VPOP_NATIONAL,
} from '../redux/constant';

const useParamsAction = (item) => {
    const [paramFilter, setParamsFilter] = useState();
    const type = item.type;

    switch (type) {
        case VPOP_NATIONAL:
            setParamsFilter(type);
            break;
        case KPOP_NATIONAL:
            setParamsFilter(type);
            break;
        case USUK_NATIONAL: 
            setParamsFilter(type);
        case LOBAl:
            setParamsFilter(type);
        default:
            setParamsFilter(type);
    }
    return [paramFilter];
};
export default useParamsAction;
