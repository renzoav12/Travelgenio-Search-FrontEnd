import React, { FunctionComponent } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { SearchBoxState } from "@hotels/search-box";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import { Moment } from "moment";
import { Person, Face } from "@material-ui/icons";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import Skeleton from "react-loading-skeleton";


export interface DateOccupancyProps {
    init: SearchBoxState;
    display: boolean;
    loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        destination: {
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            color: theme.palette.primary.contrastText
        },
        occupancy: {
            marginLeft: 0
        },
        childs: {
            marginLeft: 0
        },
        occupancyCount: {
            marginLeft: 5,
            marginRight: 25
        },
        dates: {
            marginLeft: 5,
            marginRight: 10
        },
        searchIcon: {
            marginTop: -4,
            marginLeft: 10
        }
    })
);

const DateOccupancy: FunctionComponent<DateOccupancyProps> = (props) => {

    const parseCheckIn = (date: Moment | undefined) => {
        return date?.format("ddd, MMM DD");
    }
    const parseCheckOut = (date: Moment | undefined) => {
        return date?.format("ddd, MMM DD");
    }
    const arrow = () =>
     props.display ? <KeyboardArrowUp /> : <KeyboardArrowDown />;

    const classes = useStyles();
    return (
        <Box className={classes.destination} >
            <Box>
                <CalendarIcon style={{ color: "aliceblue" }} />
            </Box>
            <Box className={classes.dates}>
                {parseCheckIn(props.init.stay.from)} | {parseCheckOut(props.init.stay.to)}
            </Box>
            <Box className={classes.occupancy}>
                <Person style={{ color: "aliceblue" }} />
            </Box>

            <Box className={classes.occupancyCount}>
                {props.init.occupancy.rooms.map((room) => room.adults)}
            </Box>

            <Box className={classes.childs}>
                <Face style={{ color: "aliceblue" }} />
            </Box>
          
            <Box className={classes.searchIcon}>
                {arrow()}
            </Box>
        </Box>
    );

};

export default DateOccupancy;

