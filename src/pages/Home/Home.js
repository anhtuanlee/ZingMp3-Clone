import { useEffect, useState } from 'react';
import SliderSlick from '../../layouts/components/Sliderslick';
import Audio from '../../layouts/components/Audio';

function Home() {
    const [showSlider, setShowSlider] = useState(false);
    useEffect(() => {
        setShowSlider(true);
    }, []);

    return (
        <div> 
            {showSlider && <SliderSlick />}
            <div>
                <Audio />
            </div>
        </div>
    );
}

export default Home;
