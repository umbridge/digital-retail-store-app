import React from 'react'
import c1 from '../../assets/images/c1.jpg'
import c2 from '../../assets/images/c2.jpg'
import c3 from '../../assets/images/c3.jpg'
import c4 from '../../assets/images/c4.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


import './PosterCarousel.scss'
// import { AnimationHandler, AnimationHandlerResponse } from 'react-responsive-carousel/lib/ts/components/Carousel/types'

const PosterCarousel = () => {
    
  
  return (
    <div className="carousel-container" data-testid="posterCarousel">
    <Carousel  autoPlay={true} interval={5000} animationHandler={'fade'} swipeable={false} showIndicators={false}  showArrows={false} showThumbs={false} showStatus={false} infiniteLoop={true} axis='vertical'  >
                <div>
                    <img className='posterImg' src={c1} alt='poster1'/>
                  
                </div>
                <div>
                    <img className='posterImg' src={c2} alt='poster2'/>
                    
                </div>
                <div>
                    <img className='posterImg' src={c3} alt='poster3'/>
                    
                </div>
                <div>
                    <img className='posterImg' src={c4} alt='poster4'/>
                    
                </div>
            </Carousel>
    </div>
  )
}

export default PosterCarousel