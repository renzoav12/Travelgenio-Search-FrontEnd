import React, { FunctionComponent } from 'react';
import SearchBox , { SearchBoxState } from "@hotels/search-box";
import { Box} from "@material-ui/core";
import {
    SuggestionHint,
    SuggestionEntry,
  } from "@hotels/search-box/dist/Autocomplete/Autocomplete";


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

const ModalSearch: FunctionComponent<ModalProps> = (props) => {

    const divStyle = { 
        display: props.displayModal ? 'block' : 'none'
    };

    function closeModal(e) {
        e.stopPropagation()
        props.closeModal(false)
     }

    return (
       <div 
         className="modal"
         onClick={closeModal}
         style={divStyle} >
          <div 
             className="modal-content"
             onClick={ e => e.stopPropagation() } >
             <Box>
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
          </div>
       </div> 
    );

}

export default ModalSearch;



