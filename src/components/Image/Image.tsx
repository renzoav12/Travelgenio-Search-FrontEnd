import React from 'react';
import './Image.scss';

export interface ImageProps {
    url: string;
};

const Image = (props: ImageProps) => {
  return <div className="otravo-image">
    <figure>
      <img src={props.url}/>
    </figure>
  </div>;
};

export default Image;
