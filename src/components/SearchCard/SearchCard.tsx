import React from 'react';
import SearchCardPricing, { SearchCardPricingProps } from '../SearchCardPricing/SearchCardPricing';
import SearchCardContent, { SearchCardContentProps } from '../SearchCardContent/SearchCardContent';
import { addLeadingSlash } from 'history/PathUtils';

import './SearchCard.scss';

export interface SearchCardProps {
    id: string,
    content: SearchCardContentProps;
    pricing: SearchCardPricingProps;
};

const SearchCard = ({id, content, pricing}: SearchCardProps) => (
    <div className="otravo-box-with-border otravo-card">
        <div className="otravo-card-content-section">
            <SearchCardContent id={id} {...content}></SearchCardContent>
        </div>
        <div className="otravo-card-pricing-section">
            <SearchCardPricing {...pricing}></SearchCardPricing>
        </div>
    </div>
);

export default SearchCard;
