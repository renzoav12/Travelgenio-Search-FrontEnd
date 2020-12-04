import React, { FunctionComponent } from 'react';
import { Box} from "@material-ui/core";
import './App.scss';
import FilterBox, { FilterBoxSelected } from "./../../FilterBox/FilterBox";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ValueFilterProp } from '../../FilterBox/ValueFilter/ValueFilter';
import { RangeFilterProp } from '../../FilterBox/RangeFilter/RangeFilter';
import { SingleOptionFilterProp } from '../../FilterBox/SingleOptionFilter/SingleOptionFilter';
import { RangeOptionFilterProp } from '../../FilterBox/RangeOptionFilter/RangeOptionFilter';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

export interface ModalProps {
    displayModal: boolean;
    closeModal: (event) => void;
    filters: Map<
          string,
          | ValueFilterProp
          | RangeFilterProp
          | SingleOptionFilterProp
          | RangeOptionFilterProp
        >;
        onChange: (filter: FilterBoxSelected) => void;
        loading: boolean;
        display: boolean;

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filter: {
            width: "100%",
            marginTop: 40
        },
        backPage: {
            
        },
        iconBack: {
            height: 37,
            width: 32,
            marginTop: 15,
            marginLeft: 17
        }
    })
);

const ModalFilter: FunctionComponent<ModalProps> = (props) => {
    const classes = useStyles();

    const divStyle = { 
        display: props.displayModal ? 'block' : 'none'
    };

    function closeModal(e) {
        e.stopPropagation()
        props.closeModal(false)
     }
    
    return (
       <Box className={"modal-filter"} onClick={closeModal} style={divStyle} >
          <Box className={"modal-content-filter"} onClick={ e => e.stopPropagation() } >
          <Box className={"close-filter"} onClick={ closeModal }>
                <KeyboardBackspaceIcon className={classes.iconBack} />
            </Box>
           <Box className={classes.filter}>
                <FilterBox
                    filters={props.filters}
                    onChange={props.onChange}
                    loading={props.loading}
                    display={ true }
                />
            </Box>
          </Box>
       </Box> 
    );

}

export default ModalFilter;



