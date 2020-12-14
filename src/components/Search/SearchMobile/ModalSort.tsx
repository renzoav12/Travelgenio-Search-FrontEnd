import React, { FunctionComponent, useState } from 'react';
import { Box, Paper} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SortField } from '../../../model/search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './ModalSort.scss';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Translate from "@hotels/translation";
import Keys from "@hotels/translation-keys";

export interface ModalProps {
    displayModal: boolean;
    closeModal: (event) => void;
    showViewIcons: boolean;
    sortFields: SortField[];
    sort: (field: string, order: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filter: {
            width: "100%"
        },
        container: {
            [theme.breakpoints.down("xs")]:{
              display:"inherit"
            },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
          title:{
            [theme.breakpoints.down("xs")]:{
              marginBottom:"20px"
            },
            
          },
          formControl: {
            "& .MuiSelect-select": {
              paddingTop: "7px",
              paddingBottom: "7px",
            },
            "& .MuiInputLabel-outlined": {
              zIndex:0  
            },
            width: "80%",
            marginLeft: 10
            
          },    
          iconsSortContainer: {
            [theme.breakpoints.down("xs")]:{
              marginLeft: "16px"
            },      
            display: "flex",
          },
          icon: {
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.palette.divider,
            borderRadius: 5,
            width: 32,
            height: 32,
            marginRight: 10,
          },
          selected: {
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          sort: {
            "&::before": {
              borderBottom: "0 !important",
              transition: "none",
            },
            "&::after": {
              borderBottom: "0 !important",
              transition: "none",
            },
            "& .MuiSelect-select": {
              background: "none !important",
            }
          },
          button: {
            display: 'block',
            marginTop: theme.spacing(2),
          },
          backPage: {
            
          },
          iconBack: {
              height: 37,
              width: 32
          },
          orderBy: {
            marginLeft: 6
          },
          ".MuiFormControl-root": {
            width: "80%",
            marginLeft: 10
        },
    })
);

const ModalSort: FunctionComponent<ModalProps> = (props) => {
    const classes = useStyles();

    const notSelectedValue = "empty";
    const [selectedSortValue, setSelectedSortValue] = useState(notSelectedValue);
  
  
    const divStyle = { 
        display: props.displayModal ? 'block' : 'none'
    };

    const getMenuItemValue = (sortField: SortField): string => {
        return `${sortField.field}_${sortField.order}`;
      }
    
      const getTranslationKey = (sortField: SortField): string => {
        return Keys.search[`${sortField.field}_${sortField.order.toLocaleLowerCase()}`];
      }

    function closeModal(e) {
        e.stopPropagation()
        props.closeModal(false)
     };

     const sortFields = props.sortFields.map((sortField, index) => {
        return (
          <MenuItem key={index} value={getMenuItemValue(sortField)}>
            <Translate tkey={getTranslationKey(sortField)}/>
          </MenuItem>
        );
      });
    

     const sortChangeHandler = (event):void => {
        if(selectedSortValue !== event.target.value) {
          setSelectedSortValue(event.target.value);
          const sortData = event.target.value.split("_");
          props.sort(sortData[0], sortData[1]);
        }
      }
        
    return (
        <Box className={"modal-filter"} onClick={closeModal} style={divStyle} >
        <Box className={"modal-content-filter"} onClick={ e => e.stopPropagation() } >
            <Box className={"close-sort"} onClick={ closeModal }>
                <KeyboardBackspaceIcon className={classes.iconBack} />
            </Box>
         <Box className={classes.filter}>
            <Box className={classes.orderBy}> 
                <h1> <Translate tkey={Keys.search.sort_by}/></h1>
            </Box>   
         <FormControl className={classes.formControl}>
                <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={selectedSortValue}
                        onChange={sortChangeHandler}
                        className={classes.sort}
                >
            <MenuItem value={notSelectedValue}>
                    <Translate tkey={Keys.search.recommended}/>
            </MenuItem>
            {sortFields}
                </Select>
      </FormControl> 
          </Box>
        </Box>
     </Box> 
    );

}

export default ModalSort;