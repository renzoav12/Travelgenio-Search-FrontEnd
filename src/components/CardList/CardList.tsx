import React, { FunctionComponent } from 'react';
import Card from '../Card/Card';
import { CardProps } from '../Card/Card';
import { Box } from '@material-ui/core';

export interface CardListProps {
    accommodations: CardProps[];
    selected: (id: string) => void;
}

const CardList: FunctionComponent<CardListProps> = props => {
  const renderAll = () => {
      const { accommodations: accommodations } = props;

      if (!accommodations) {
          return null;
      }
      return accommodations.map((accommodation: CardProps) => {
          return <Card
              key={accommodation.id}
              id={accommodation.id}
              content={accommodation.content} pricing={accommodation.pricing}
              selected={() => props.selected(accommodation.id)}/>;
      });
  }

  return <Box>{renderAll()}</Box>;
}

export default CardList;