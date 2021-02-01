import { makeStyles, Theme, createStyles, Box, withStyles } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { RatingProps } from "../Content";
import Tooltip from '@material-ui/core/Tooltip';
import Keys from "@hotels/translation-keys";
import Translate from "@hotels/translation";

export interface RatingGuestProps {
    ratingGuest: RatingProps;
}

const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[2],
      fontSize: 14,
      marginTop: 10
    },
  }))(Tooltip);
  

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

        rating: {
            position: 'relative',
            whiteSpace: 'normal',
            cursor: 'pointer'
        },
        guest: {
            width: 24,
            height: 20,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.light
        },
        value: {
            fontSize: 12,
            fontWeight: 700,
            color: '#fff',
            marginLeft: 3
        }       
    })
);


const RatingGuest: FunctionComponent<RatingGuestProps> = (props, context) => {

    const classes = useStyles();

    const title = () => {
        return (<Translate tkey={Keys.search.accommodation_guests_ranking_based} 
            values={{
                n: props.ratingGuest.votes
              }}> </Translate>)
    }
    return (
        <LightTooltip title={title()}>
           <span className={classes.rating}>
            <Box className={classes.guest}>
                <span className={classes.value}>{props.ratingGuest.rating}</span>
            </Box>
            
          </span>
          </LightTooltip> );
}

export default RatingGuest;