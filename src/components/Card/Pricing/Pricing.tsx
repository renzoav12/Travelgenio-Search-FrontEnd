import React from 'react';

import './Pricing.scss';

export interface PricingProps {
    id: string;
    nightlyPrice: Price;
    stayPrice: Price;
    strikethroughPrice: Price;
    selected: () => void;
};

interface Price {
    amount: Number;
    currency: string
};

const Pricing = ({ id, nightlyPrice, stayPrice, strikethroughPrice, selected }: PricingProps) => (
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
            <button onClick={selected}>Ver detalle</button>
        </div>
    </div>
);

export default Pricing;
