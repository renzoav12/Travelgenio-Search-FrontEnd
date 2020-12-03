import React, { FunctionComponent, useState } from 'react';
import { Box, Paper} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SortField } from '../../../model/search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
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

    const [age, setAge] = React.useState<string | number>('');
    const [open, setOpen] = React.useState(false);
  
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setAge(event.target.value as number);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

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
            <Box className={"close-sort"} onClick={ closeModal }>
                <KeyboardBackspaceIcon className={classes.iconBack} />
            </Box>
         <Box className={classes.filter}>
            <Box className={classes.orderBy}> 
                <h1> <Translate tkey={Keys.search.sort_by}/></h1>
            </Box>   
         <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={age}
                        onChange={handleChange}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
      </FormControl> 
          </Box>
        </Box>
     </Box> 
    );

}

export default ModalSort;