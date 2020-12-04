import React, { FunctionComponent } from 'react';
import SearchBox , { SearchBoxState } from "@hotels/search-box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box} from "@material-ui/core";
import {
    SuggestionHint,
    SuggestionEntry,
  } from "@hotels/search-box/dist/Autocomplete/Autocomplete";
import './App.scss';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


export interface ModalProps {
    displayModal: boolean;
    closeModal: (event) => void;
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
        iconBack: {
            height: 37,
            width: 32,
            marginTop: 15,
            marginLeft: 9
        }
    })
);

const ModalSearch: FunctionComponent<ModalProps> = (props) => {
    const classes = useStyles();

    const divStyle = { 
        display: props.displayModal ? 'block' : 'none'
    };

    function closeModal(e) {
        e.stopPropagation()
        props.closeModal(false)
     }
    
    return (
       <Box className={"modal-search"} onClick={closeModal} style={divStyle} >
          <Box className={"modal-content-search"} onClick={ e => e.stopPropagation() } >
          <Box className={"close-filter"} onClick={ closeModal }>
                <KeyboardBackspaceIcon className={classes.iconBack} />
            </Box>
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
       </Box> 
    );

}

export default ModalSearch;



