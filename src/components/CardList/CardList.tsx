import React, { Component } from 'react';
import _ from 'lodash';
import SearchCard from '../Card';
import { CardProps } from '../Card/Card';

export interface CardListProps {
    accommodations: CardProps[];
    selected: (id: string) => void;
}

class CardList extends Component<CardListProps> {
    renderAll(): JSX.Element[] | null {
        const { accommodations: accommodations } = this.props;
        if (!accommodations) {
            return null;
        }
        return accommodations.map((accommodation: CardProps) => {
            return <SearchCard
                key={accommodation.id}
                id={accommodation.id}
                content={accommodation.content} pricing={accommodation.pricing}
                selected={() => this.props.selected(accommodation.id)}/>;
        });
    }

    render() {
        return <div>{this.renderAll()}</div>;
    }
}

export default CardList