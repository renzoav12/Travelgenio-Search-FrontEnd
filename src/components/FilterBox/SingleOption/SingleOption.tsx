import React, { FunctionComponent } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

interface Props {
  option: SingleOptionProp;
  onChange: (selected: boolean) => void;
  label?: JSX.Element;
}

export interface SingleOptionProp {
  code: string,
  label: string,
  quantity: number,
  selected: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterOption: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: 12
    },
    
    filterOptionCheckbox: {
      width: 45,
      maxHeight: "100%",
      '& .MuiButtonBase-root': {
        padding: '0 !important'
      }
    },
  
    filterOptionLabel: {
      width: "100%"
    },

    filterOptionQuantity: {
      width: 80,
      textAlign: "right",
      paddingRight: 10
    }
  }),
);

const SingleOption: FunctionComponent<Props> = props => {
    
  const classes = useStyles();

  return <Box className={classes.filterOption}>
    <Box className={classes.filterOptionCheckbox}>
      <Checkbox 
        style = {{ backgroundColor: 'transparent' }}
        color = "primary" 
        value = {props.option.code} 
        checked = {props.option.selected}
        onChange = {(event):void => props.onChange(event.target.checked)}/>
    </Box>
    <Box className={classes.filterOptionLabel}>
      {props.label ? props.label : props.option.label}
    </Box>
    <Box className={classes.filterOptionQuantity}>
      {props.option.quantity}
    </Box>
  </Box>;
}

export default SingleOption;