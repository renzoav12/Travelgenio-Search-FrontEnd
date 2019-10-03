import React from 'react';
import SearchCardContentImage, { SearchCardContentImageProps } from '../SearchCardContentImage/SearchCardContentImage';
import SearchCardContentCategory, { SearchCardContentCategoryProps } from '../SearchCardContentCategory/SearchCardContentCategory';
import SearchCardContentAddress, { SearchCardContentLocationAddressProps } from '../SearchCardContentAddress/SearchCardContentAddress';

import './SearchCardContent.scss';

const foodIcon = require("../../assets/images/icons/food_icon.svg");

export interface SearchCardContentProps {
    id: string;
    name: string;
    category: SearchCardContentCategoryProps;
    location: SearchCardContentLocationProps;
    amenities: SearchCardContentAmenityProps[];
    images: SearchCardContentImageProps;
};

interface SearchCardContentAmenityProps {
    id: string;
    name: string;
};

interface SearchCardContentLocationProps {
    address: SearchCardContentLocationAddressProps;
};


const SearchCardContent = ({id, category, amenities, name, images, location}: SearchCardContentProps) => (
    <div className="otravo-card-content">
        <div className="otravo-card-image-section">
            <SearchCardContentImage {...images}></SearchCardContentImage>
        </div>
        <div className="otravo-card-info">
            <div className="otravo-title">{name}</div>
            <div className="otravo-card-category-section">
                <SearchCardContentCategory {...category}></SearchCardContentCategory>
            </div>
            <div className="otravo-card-address-section">
                <SearchCardContentAddress {...location.address}></SearchCardContentAddress>
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
