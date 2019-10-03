import React, {Component} from 'react';

import './SearchCardContentAddress.scss';

export interface SearchCardContentLocationAddressProps {
    city: string;
    state: string;
    street: string;
    streetNumber: string;
    country: string;
};


class SearchCardContentAddress extends Component<SearchCardContentLocationAddressProps> {

    getAddress = () => {
        let city = this.props.city;
        return city;
    }

    render() {
        return <div className="otravo-card-address">{this.getAddress()}</div>;
    }
}

export default SearchCardContentAddress;
