import { useState } from 'react';
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';
import { DefaultLayout } from "../layouts/DefaultLayout";
import Image from 'react-bootstrap/Image'
import { Loading } from '../components/Loading';
import './Presentation.css';

export const Presentation = () => {
    const [slideNumber, setSlideNumber] = useState(1);
    const [loading, setLoading] = useState(false); // ideally this would start as true and img onLoad would set to false

    const MIN_SLIDE_NUM = 0;
    const MAX_SLIDE_NUM = 33;

    const slideImage = `https://fina-4390.s3.amazonaws.com/_Project+5+-+ML/${slideNumber}.png`

    const slideRight = () => {
        let newSlideNumber = slideNumber + 1;
        newSlideNumber < MAX_SLIDE_NUM && setSlideNumber(newSlideNumber); // update to match # of Canva slides
    };

    const slideLeft = () => {
        let newSlideNumber = slideNumber - 1;
        newSlideNumber > MIN_SLIDE_NUM && setSlideNumber(newSlideNumber);
    };

    return (
        <DefaultLayout>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <Image src={slideImage} className='slide-image' alt='' rounded onError={() => setLoading(true)} />
                    </>
            }
            {slideNumber > MIN_SLIDE_NUM + 1 && <BsArrowLeftCircle className='left-arrow' onClick={() => slideLeft()} />}
            {slideNumber < MAX_SLIDE_NUM - 1 && <BsArrowRightCircle className='right-arrow' onClick={() => slideRight()} />}
        </DefaultLayout>
    );
}
