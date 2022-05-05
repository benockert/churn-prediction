import { useState } from 'react';
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';
import { DefaultLayout } from "../layouts/DefaultLayout";
import Image from 'react-bootstrap/Image'
import { Loading } from '../components/Loading';
import './Presentation.css';

export const Presentation = ({ slideNumber, setSlideNumber }) => {
    const [loading, setLoading] = useState(false); // ideally this would start as true and img onLoad would set to false

    const MIN_SLIDE_NUM = 1;
    const MAX_SLIDE_NUM = 22;

    const slideImage = `https://fina-4390.s3.amazonaws.com/Final+Project-+ML/${slideNumber}.png`;

    const slideRight = () => {
        slideNumber < MAX_SLIDE_NUM && setSlideNumber(slideNumber + 1); // update to match # of Canva slides
    };

    const slideLeft = () => {
        slideNumber > MIN_SLIDE_NUM && setSlideNumber(slideNumber - 1);
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
            {slideNumber > MIN_SLIDE_NUM && <BsArrowLeftCircle className='left-arrow' onClick={() => slideLeft()} />}
            {slideNumber < MAX_SLIDE_NUM && <BsArrowRightCircle className='right-arrow' onClick={() => slideRight()} />}
        </DefaultLayout>
    );
}
