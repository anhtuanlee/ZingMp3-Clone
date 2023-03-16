import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SliderSlick from '../../layouts/components/Sliderslick'; 
import { activeSidebar } from '../../redux/actions';

function Home() {
    const [showSlider, setShowSlider] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        setShowSlider(true);
        dispatch(activeSidebar(1))
    }, []);

    return <div>{showSlider && <SliderSlick />}</div>;
}

export default Home;
