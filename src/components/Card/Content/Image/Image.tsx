import React from 'react';
import Img from 'react-image'
import loadingImage from '../../../../assets/images/loadingHotel.jpg';
import './Image.scss';

export interface ImageProps {
    images: Image[];
};

interface Image {
    url: string;
};

const loadingComponent = () => (
  <img src={loadingImage}/>
)

const Image = (images: ImageProps) => (
    <div className="otravo-card-image">
        <div className="otravo-image">
            <figure>
              <Img src={images[0].url} loader={loadingComponent()} unloader={loadingComponent()}/>
            </figure>
        </div>
    </div>
);

export default Image;
