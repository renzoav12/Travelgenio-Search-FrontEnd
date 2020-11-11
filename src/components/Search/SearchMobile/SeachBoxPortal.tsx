import React, { FunctionComponent, useState } from "react";
import SearchBox , { SearchBoxState } from "@hotels/search-box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Grid, Paper } from "@material-ui/core";
import DestinationPortal from "./DestinationPortal";
import DateOccupancy from "./DateOccupancy";
import './Modal.scss';
import {
    SuggestionHint,
    SuggestionEntry,
  } from "@hotels/search-box/dist/Autocomplete/Autocomplete";
import ModalSearch from "./ModalSearch";

export interface SearchBoxPortalProps {
    suggestionName: string;
    init: SearchBoxState;
    onChange: (state: SearchBoxState) => void;
    onChangeSuggestionHint: (suggestionHint: SuggestionHint) => void;
    suggestions: SuggestionEntry[];
    title: string;
    locale: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchPortal:{
        width : "100%"
    },
    portal: {
        marginTop: "5px",
        marginLeft: "-20px",
        marginRight: "-20px",
        height : "90px",
        backgroundColor: "#235ec1e6"
    },
    search: {

    }
  })
);

const SearchBoxPortal: FunctionComponent<SearchBoxPortalProps> = (props) => {
    const classes = useStyles();
    
    const [modal, setModal] = useState(false);

    const selectModal = (event):void => {
         setModal(!modal);
    }

    const getModal = () => {
        if (modal) {
            return (
                <ModalSearch 
                    displayModal={modal}
                    closeModal={selectModal}
                    suggestionName={props.suggestionName}
                    init={props.init}
                    onChange={props.onChange}
                    onChangeSuggestionHint={props.onChangeSuggestionHint}
                    suggestions={props.suggestions}
                    title={props.title}
                    locale={props.locale}
                />
            );
        } return null;
    }
    
    return (
        <Box>   
          {getModal()}  
        <Paper className={classes.portal} onClick={selectModal}>
          
         <Grid item md={4} xs={12} >
                <Box className={classes.searchPortal} > 
                   <DestinationPortal destination={props.suggestionName}/>
                </Box>
                <Box>
                    <DateOccupancy init={props.init}/>
                </Box>
        </Grid> 
        </Paper>
        </Box>
    )
};

export default SearchBoxPortal;