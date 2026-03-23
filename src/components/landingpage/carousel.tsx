import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'


const Carousel = () => {


  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])


  return (
    <div className="embla overflow-hidden " ref={emblaRef}>
      <div className="embla__container flex ">
        <div className='embla__slide flex-custom transition ease-in-out delay-40 hover:-translate-y-1 hover:-translate-x-1 hover:scale-110 duration-300 ...'>
          <img className='h-96 w-96' src="./slide1.png" alt="" />
        </div>
        <div className='embla__slide flex-custom transition ease-in-out delay-40 hover:-translate-y-1 hover:-translate-x-1 hover:scale-110 duration-300 ...'>
          <img className='h-96 w-96' src="./slide2.png" alt="" />
        </div>
        <div className='embla__slide flex-custom transition ease-in-out delay-40 hover:-translate-y-1 hover:-translate-x-1 hover:scale-110 duration-300 ...'>
          <img className='h-96 w-96' src="./slide3.png" alt="" />
        </div>
        <div className='embla__slide flex-custom transition ease-in-out delay-40 hover:-translate-y-1 hover:-translate-x-1 hover:scale-110 duration-300 ...'>
          <img className='h-96 w-96' src="./slide4.png" alt="" />
        </div>
        <div className='embla__slide flex-custom transition ease-in-out delay-40 hover:-translate-y-1 hover:-translate-x-1 hover:scale-110 duration-300 ...'>
          <img className='h-96 w-96' src="./slide5.png" alt="" />
        </div>

      </div>
    </div>
  )
}

export default Carousel