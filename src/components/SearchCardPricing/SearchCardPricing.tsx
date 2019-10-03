import React from 'react';

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
    <div>
        <div className="">
            Nightly: {nightlyPrice.currency} {nightlyPrice.amount}
        </div>

        <div className="">
            stay: {stayPrice.currency} {stayPrice.amount}
        </div>

        <div className="">
            discount: {strikethroughPrice.currency} {strikethroughPrice.amount}
        </div>
    </div>
);

export default SearchCardPricing;
