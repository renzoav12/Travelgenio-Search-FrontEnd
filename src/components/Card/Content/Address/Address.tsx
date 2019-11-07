import React, {Component} from 'react';

import './Address.scss';

export interface AddressProps {
    city: string;
    state: string;
    street: string;
    streetNumber: string;
    country: string;
};


class Address extends Component<AddressProps> {

    getAddress = () => {
        let city = this.props.city;
        return city;
    }

    render() {
        return <div className="otravo-card-address">{this.getAddress()}</div>;
    }
}

export default Address;
