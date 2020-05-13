import React from 'react';
import Image from '../Image';
import './SearchCardContentImage.scss';

export interface SearchCardContentImageProps {
  images: SearchCardImage[];
};

interface SearchCardImage {
  url: string;
};

const SearchCardContentImage = (images: SearchCardContentImageProps) => {
  return <div className="otravo-card-image">
    <Image url={images[0].url} />
  </div>;
};

export default SearchCardContentImage;
