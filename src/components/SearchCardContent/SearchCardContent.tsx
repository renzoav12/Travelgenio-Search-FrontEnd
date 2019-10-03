import React from 'react';
import SearchCardContentImage, { SearchCardContentImageProps } from '../SearchCardContentImage/SearchCardContentImage';

export interface SearchCardContentProps {
    id: string;
    name: string;
    images: SearchCardContentImageProps;
};

const SearchCardContent = ({id, name, images}: SearchCardContentProps) => (
    <div>
        <div>
            id: {id}
            title: {name}
            <SearchCardContentImage {...images}></SearchCardContentImage>
        </div>
    </div>
);

export default SearchCardContent;
