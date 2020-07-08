import React, { FunctionComponent } from "react";
import Card from "../Card/Card";
import { CardProps } from "../Card/Card";
import { Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export interface CardListProps {
  accommodations: CardProps[];
  selected: (id: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: 20,
    },
  })
);

const CardList: FunctionComponent<CardListProps> = (props) => {
  const classes = useStyles();

  const renderAll = () => {
    if (!props.accommodations) {
      return null;
    }
    return props.accommodations.map((accommodation: CardProps) => {
      return (
        <Box className={classes.card} key={accommodation.id}>
          <Card
            id={accommodation.id}
            content={accommodation.content}
            pricing={accommodation.pricing}
            selected={() => props.selected(accommodation.id)}
          />
        </Box>
      );
    });
  };

  return <Box id="accommodation_cards">{renderAll()}</Box>;
};

export default CardList;
