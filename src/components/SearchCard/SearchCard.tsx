import React from 'react';
import SearchCardPricing, { SearchCardPricingProps } from '../SearchCardPricing/SearchCardPricing';
import SearchCardContent, { SearchCardContentProps } from '../SearchCardContent/SearchCardContent';
import { addLeadingSlash } from 'history/PathUtils';

export interface SearchCardProps {
    id: string,
    content: SearchCardContentProps;
    pricing: SearchCardPricingProps;
};

const SearchCard = ({id, content, pricing}: SearchCardProps) => (
    <div className="card">
        id: {id}
        <div>
            <SearchCardContent id={id} {...content}></SearchCardContent>
        </div>
        <div>
            <SearchCardPricing {...pricing}></SearchCardPricing>
        </div>
    </div>
);

export default SearchCard;
