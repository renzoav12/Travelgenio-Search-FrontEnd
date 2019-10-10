import React from 'react';
import SearchCardPricing, { SearchCardPricingProps } from '../SearchCardPricing/SearchCardPricing';
import SearchCardContent, { SearchCardContentProps } from '../SearchCardContent/SearchCardContent';
import { Grid } from '@material-ui/core';
import './SearchCard.scss';


export interface SearchCardProps {
    id: string,
    content: SearchCardContentProps;
    pricing: SearchCardPricingProps;
};

const SearchCard = ({id, content, pricing}: SearchCardProps) => (
    <Grid container className="otravo-box-with-border otravo-card">
        <Grid item xs={12} sm={6} lg={8} className="otravo-card-content-section">
            <SearchCardContent id={id} {...content}></SearchCardContent>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} className="otravo-card-pricing-section">
            <SearchCardPricing {...pricing}></SearchCardPricing>
        </Grid>
    </Grid>
);

export default SearchCard;
