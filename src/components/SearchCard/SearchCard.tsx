import React from 'react';
import { AccommodationRateModel } from '../../reducers/accommodationRateSearchReducer';

interface AccommodationRateProps {
    rate: AccommodationRateModel;
};

const SearchCard = ({ rate }: AccommodationRateProps) => (
    <div className="card">
        <div className="image">
            <img src="https://picsum.photos/150/100/?random" alt="none" />
        </div>
        <div className="content">
            <div className="header">{rate.name}</div>
            <div className="meta">
                <span className="category">*****</span>
            </div>
            <div className="description">
                <p></p>
            </div>
        </div>

    </div>
);

export default SearchCard;
