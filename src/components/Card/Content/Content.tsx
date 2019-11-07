import React from 'react';
import Image, { ImageProps } from './Image/Image';
import Category from '../../Category/Category';
import Address, { AddressProps } from './Address/Address';

import './Content.scss';
import { Grid } from '@material-ui/core';

const foodIcon = require("../../../assets/images/icons/food_icon.svg");

export interface ContentProps {
    id: string;
    name: string;
    category: CategoryProps;
    location: LocationProps;
    amenities: AmenityProps[];
    images: ImageProps;
};

interface CategoryProps {
    id: string;
    code: string;
};

interface AmenityProps {
    id: string;
    name: string;
};

interface LocationProps {
    address: AddressProps;
};

const Content = ({id, category, amenities, name, images, location}: ContentProps) => (
    <Grid container className="otravo-card-content">
        <Grid item xs={12} md={4} className="otravo-card-image-section">
            <Image {...images}></Image>
        </Grid>
        <Grid item xs={12} md={8} className="otravo-card-info">
            <div className="otravo-title">{name}</div>
            <div className="otravo-card-category-section">
                <Category stars={parseInt(category.code)}></Category>
            </div>
            <div className="otravo-card-address-section">
                <Address {...location.address}></Address>
            </div>
            <div className="otravo-card-ammenities">
                <img className="otravo-card-amenity" src={foodIcon}/>
                <img className="otravo-card-amenity" src={foodIcon}/>
                <img className="otravo-card-amenity" src={foodIcon}/>
            </div>
        </Grid>
    </Grid>
);

export default Content;
