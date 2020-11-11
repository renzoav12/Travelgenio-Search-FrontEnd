import React, { FunctionComponent } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";


export interface DestinationPortalProps{
    destination:string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    destination: {
        display: "flex",
        width: "100%",
        color: theme.palette.primary.contrastText
    },
    icon: {
    
    },
    destination2: {
        marginLeft: 5
    }
  })
);



const DestinationPortal: FunctionComponent<DestinationPortalProps> = (props) => {
    const classes = useStyles();
    return (
        <Box className={classes.destination}>
            <Box>
                <LocationOnIcon style={{ color:"aliceblue"}}/>
            </Box>
            <Box className={classes.destination2}>
                {props.destination}
            </Box>
        </Box> 
    );
};

export default DestinationPortal;

