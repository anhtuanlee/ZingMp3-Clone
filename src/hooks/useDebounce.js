import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [valueNew, setValues] = useState(value);

    useEffect(() => {
        const result = setTimeout(() => {
            setValues(value);
        }, delay);

        return () => clearTimeout(result);
    }, [value, delay]);

    return valueNew;
};
export default useDebounce;
