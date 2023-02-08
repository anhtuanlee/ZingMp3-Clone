import { useEffect, useState } from 'react';
import SliderSlick from '../../layouts/components/Sliderslick';

function Home() {
    const [showSlider, setShowSlider] = useState(false);
    useEffect(() => {
        setShowSlider(true);
    }, []);

    return <div> {showSlider && <SliderSlick />}</div>;
}

export default Home;
