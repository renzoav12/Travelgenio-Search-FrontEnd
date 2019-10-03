import React from 'react';

import './SearchCardPricing.scss';

export interface SearchCardPricingProps {
    nightlyPrice: Price;
    stayPrice: Price;
    strikethroughPrice: Price;
};

interface Price {
    amount: Number;
    currency: string
};

const SearchCardPricing = ({ nightlyPrice, stayPrice, strikethroughPrice }: SearchCardPricingProps) => (
    <div className="otravo-card-pricing">
        <div className="otravo-card-strikeout-price">
            {strikethroughPrice.amount} {strikethroughPrice.currency} 
        </div>
        <div className="otravo-card-stay-price">
            {stayPrice.amount} {stayPrice.currency} 
        </div>
        <div className="otravo-label">
            {nightlyPrice.amount} {nightlyPrice.currency} por noche.
        </div>
        <div className="otravo-margin-top-30">
            <button>Ver detalle</button>
        </div>
    </div>
);

export default SearchCardPricing;
