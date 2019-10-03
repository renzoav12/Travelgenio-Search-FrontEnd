import React, { Component } from 'react';
import _ from 'lodash';
import SearchCard from '../../components/SearchCard';
import { SearchCardProps } from '../SearchCard/SearchCard';

export interface SearchCardListProps {
    accommodations: SearchCardProps[];
}

class SearchCardList extends Component<SearchCardListProps> {
    renderAll(): JSX.Element[] | null {
        const { accommodations: accommodations } = this.props;
        if (!accommodations) {
            return null;
        }
        return accommodations.map((accommodation: SearchCardProps) => {
            return <SearchCard key={accommodation.id} id={accommodation.id} content={accommodation.content} pricing={accommodation.pricing}/>;
        });
    }

    render() {
        return <div>{this.renderAll()}</div>;
    }
}

export default SearchCardList