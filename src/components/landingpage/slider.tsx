import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Slider = () => (
  <Carousel autoplay>
    <div>
      <img className='h-96 w-96' src="./slide1.png" alt="" />
    </div>
    <div>
    <img className='h-96 w-96' src="./slide2.png" alt="" />
    </div>
    <div>
    <img className='h-96 w-96' src="./slide3.png" alt="" />
    </div>
    <div>
    <img className='h-96 w-96' src="./slide4.png" alt="" />
    </div>
    <div>
    <img className='h-96 w-96' src="./slide5.png" alt="" />
    </div>
  </Carousel>
);

export default Slider;