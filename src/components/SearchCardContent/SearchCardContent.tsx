import React from 'react';
import SearchCardContentImage, { SearchCardContentImageProps } from '../SearchCardContentImage/SearchCardContentImage';
import Category from '../Category/Category';
import SearchCardContentAddress, { SearchCardContentLocationAddressProps } from '../SearchCardContentAddress/SearchCardContentAddress';

import './SearchCardContent.scss';
import { Grid } from '@material-ui/core';

const foodIcon = require("../../assets/images/icons/food_icon.svg");

export interface SearchCardContentProps {
    id: string;
    name: string;
    category: SearchCardContentCategoryProps;
    location: SearchCardContentLocationProps;
    amenities: SearchCardContentAmenityProps[];
    images: SearchCardContentImageProps;
};

interface SearchCardContentCategoryProps {
    id: string;
    code: string;
};

interface SearchCardContentAmenityProps {
    id: string;
    name: string;
};

interface SearchCardContentLocationProps {
    address: SearchCardContentLocationAddressProps;
};


const SearchCardContent = ({id, category, amenities, name, images, location}: SearchCardContentProps) => (
    <Grid container className="otravo-card-content">
        <Grid item xs={12} md={4} className="otravo-card-image-section">
            <SearchCardContentImage {...images}></SearchCardContentImage>
        </Grid>
        <Grid item xs={12} md={8} className="otravo-card-info">
            <div className="otravo-title">{name}</div>
            <div className="otravo-card-category-section">
                <Category stars={parseInt(category.code)}></Category>
            </div>
            <div className="otravo-card-address-section">
                <SearchCardContentAddress {...location.address}></SearchCardContentAddress>
            </div>
            <div className="otravo-card-ammenities">
                <img className="otravo-card-amenity" src={foodIcon}/>
                <img className="otravo-card-amenity" src={foodIcon}/>
                <img className="otravo-card-amenity" src={foodIcon}/>
            </div>
        </Grid>
    </Grid>
);

export default SearchCardContent;
