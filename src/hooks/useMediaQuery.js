import { useEffect, useState } from 'react';

const useMediaQuery = (query,defaultMatches = window.matchMedia(query)) => {
    const [matches, setMatches] = useState(defaultMatches); 
    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) setMatches(media.matches);

        const listener = () => setMatches(media.matches);

        media.addEventListener(listener);
        return () => media.removeEventListener(listener);
    }, [query, matches]);
    return matches
};

export default useMediaQuery;
