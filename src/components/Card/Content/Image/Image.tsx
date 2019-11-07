import React from 'react';

import './Image.scss';

export interface ImageProps {
    images: Image[];
};

interface Image {
    url: string;
};

const Image = (images: ImageProps) => (
    <div className="otravo-card-image">
        <div className="otravo-image">
            <figure>
                <img src={images[0].url}/>
            </figure>
        </div>
    </div>
);

export default Image;
