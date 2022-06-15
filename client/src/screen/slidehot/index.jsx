import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export const SlideMovieHot = () => {
    return (
        <>
            <Carousel>
                <div>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </>
    )
}