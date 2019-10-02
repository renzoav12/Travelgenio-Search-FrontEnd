import React from 'react';

export interface SearchCardContentImageProps {
    images: SearchCardImage[];
};

interface SearchCardImage {
    url: string;
};

const SearchCardContentImage = (images: SearchCardContentImageProps) => (
    <div className="card">
        <div className="image">
            <img height="100" width="140" src={images[0].url} alt="none" />
        </div>
    </div>
);

export default SearchCardContentImage;
