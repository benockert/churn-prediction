import { useEffect, useState } from 'react';
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';
import { DefaultLayout } from "../layouts/DefaultLayout";
import './Presentation.css';

export const Presentation = () => {
    const [slideNumber, setSlideNumber] = useState(1);

    const slideImage = `https://fina-4390.s3.amazonaws.com/_Project+5+-+ML/${slideNumber}.png`

    const slideRight = () => {
        let newSlideNumber = slideNumber + 1;
        newSlideNumber < 30 && setSlideNumber(newSlideNumber);
    };

    const slideLeft = () => {
        let newSlideNumber = slideNumber - 1;
        newSlideNumber > 0 && setSlideNumber(newSlideNumber);
    };

    return (
        <DefaultLayout>
            <img src={slideImage} className='slide-image rounded' alt='' />
            <BsArrowRightCircle className='right-arrow' onClick={() => slideRight()} />
            <BsArrowLeftCircle className='left-arrow' onClick={() => slideLeft()} />
        </DefaultLayout>
    );
}
