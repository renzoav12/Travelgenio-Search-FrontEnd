import React, { FunctionComponent, useState, useEffect } from "react";
import SearchBox, {
    SearchBoxState, SearchBoxLocationState,
    SearchBoxStayState, SearchBoxOccupancyState
} from "@hotels/search-box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Grid, Paper } from "@material-ui/core";
import DestinationPortal from "./DestinationPortal";
import DateOccupancy from "./DateOccupancy";
import {
    SuggestionHint,
    SuggestionEntry,
} from "@hotels/search-box/dist/Autocomplete/Autocomplete";

export interface SearchBoxPortalProps {
    suggestionName: string;
    init: SearchBoxState;
    onChange: (state: SearchBoxState) => void;
    onChangeSuggestionHint: (suggestionHint: SuggestionHint) => void;
    suggestions: SuggestionEntry[];
    title: string;
    locale: string;
    display: boolean;
    onChangePortal: (display: boolean) => void;
}

export interface SearchBoxPortal {
    location: SearchBoxLocationState;
    stay: SearchBoxStayState;
    occupancy: SearchBoxOccupancyState;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchPortal: {
            width: "100%"
        },
        portal: {
            width: "100%",
            marginTop: "-10px",
            backgroundColor: "#235ec1e6",
            paddingBottom: "6px"
        },
        search: {
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: theme.palette.divider,
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
        }
    })
);
const SearchBoxPortal: FunctionComponent<SearchBoxPortalProps> = (props) => {

    const classes = useStyles();

    const [display, setDisplay] = useState<boolean>(props.display);
    
    const getSearchBoxPortal = () => {

        
        return (<Box className={classes.search}>
            <SearchBox
                init={props.init}
                suggestionName={props.suggestionName}
                onChange={props.onChange}
                onChangeSuggestionHint={props.onChangeSuggestionHint}
                horizontal={false}
                suggestions={props.suggestions}
                title={props.title}
                locale={props.locale}
            />
        </Box>
        );
    }

    const handleSubmit = (): void => {
        setDisplay(!display);
    };

    useEffect(() => {
        setDisplay(props.display);
    }, [props.display]);

    const getSearchBox = () => {
        return display ? getSearchBoxPortal() : null;
    }

    return (

        <Paper className={classes.portal}>            
            <Grid container item md={4} xs={12} >
                <Grid onClick={handleSubmit}>
                    <Box className={classes.searchPortal}  >
                        <DestinationPortal destination={props.suggestionName} />
                    </Box>
                    <Box>
                        <DateOccupancy
                            init={props.init}
                            display={display}/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {getSearchBox()}
                </Grid>
            </Grid>
        </Paper>
    )
};

export default SearchBoxPortal;