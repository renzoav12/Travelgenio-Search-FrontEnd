import React from 'react';
import SearchCardContentImage, { SearchCardContentImageProps } from '../SearchCardContentImage/SearchCardContentImage';

import './SearchCardContent.scss';

const starIcon = require("../../assets/images/icons/star_icon.svg");
const foodIcon = require("../../assets/images/icons/food_icon.svg");

export interface SearchCardContentProps {
    id: string;
    name: string;
    images: SearchCardContentImageProps;
};

const SearchCardContent = ({id, name, images}: SearchCardContentProps) => (
    <div className="otravo-card-content">
        <div className="otravo-card-image-section">
            <SearchCardContentImage {...images}></SearchCardContentImage>
        </div>
        <div className="otravo-card-info">
            <div className="otravo-title">{name}</div>
            <div>
                <img className="otravo-card-star" src={starIcon}/>
                <img className="otravo-card-star" src={starIcon}/>
                <img className="otravo-card-star" src={starIcon}/>
                <img className="otravo-card-star" src={starIcon}/>
                <img className="otravo-card-star" src={starIcon}/>
            </div>
            <div className="otravo-card-ammenities">
                <img className="otravo-card-amenity" src={foodIcon}/>
                <img className="otravo-card-amenity" src={foodIcon}/>
                <img className="otravo-card-amenity" src={foodIcon}/>
            </div>
        </div>
    </div>
);

export default SearchCardContent;
