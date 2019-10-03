import React from 'react';

import './SearchCardContentImage.scss';

export interface SearchCardContentImageProps {
    images: SearchCardImage[];
};

interface SearchCardImage {
    url: string;
};

const SearchCardContentImage = (images: SearchCardContentImageProps) => (
    <div className="otravo-card-image">
        <figure>
            <img src={images[0].url}/>
        </figure>
    </div>
);

export default SearchCardContentImage;
