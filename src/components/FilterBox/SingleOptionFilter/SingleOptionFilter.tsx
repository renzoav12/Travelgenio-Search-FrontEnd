import React, { FunctionComponent, useState, useEffect } from 'react';
import SingleOption, {SingleOptionProp} from '../SingleOption/SingleOption';
import FilterHeader from '../FilterHeader/FilterHeader';
import {KeyboardArrowDown, KeyboardArrowUp}  from '@material-ui/icons';
import { Box } from '@material-ui/core';
import { FilterType } from '../FilterBox';
import Category from '../../Category/Category';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
  filter: SingleOptionFilterProp;
  initialShowQty: number;
  onChange: (field:string, code: string, selected: boolean) => void;
  onCleanSelection: (field:string) => void;
  display: boolean;
}

export interface SingleOptionFilterProp {
  field: string;
  label: string;
  order: number;
  type: FilterType;
  options: Array<SingleOptionProp>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    showMoreSection: {
      marginTop: 10,
    },
    showMoreOption: {
      display:"flex",
      alignItems: "center",
      color: theme.palette.primary.main,
      cursor: "pointer"
    }
  }),
);

const SingleOptionFilter: FunctionComponent<Props> = props => {
  const withoutCategory: string = "0.0";
 
  const classes = useStyles();
  
  const [showAll, setShowAll] = useState<boolean>(false);
  const [showOptionsQty, setShowOptionsQty] = useState<number>(props.initialShowQty);
  const [optionAll, setOptionAll] = useState<SingleOptionProp>({
    code: "",
    label: "Todos",
    quantity: props.filter.options.map(option => option.quantity).reduce((sum,current) => sum + current, 0),
    selected: !props.filter.options.some(option => option.selected)
  });
  const [display, setDisplay] = useState<boolean>(true);

  useEffect(() => {
    setDisplay(props.display);
  }, [props.display]);

  useEffect(() => {
    setOptionAll({
      code: "",
      label: "Todos",
      quantity: props.filter.options.map(option => option.quantity).reduce((sum,current) => sum + current, 0),
      selected: !props.filter.options.some(option => option.selected)
    });
  }, [props.filter.options]);

  const componentWillReceiveProps = (nextProps: Props) => {
    setSelectAll(!nextProps.filter.options.some(option => option.selected));      
  }

  const toggleShowAll = (): void => {
    setShowAll(!showAll);
    setShowOptionsQty(showAll ? props.initialShowQty : props.filter.options.length);
  }

  const onChangeDisplay = (show: boolean): void => {
    setDisplay(show);
  }

  const onSelectAll = (selected: boolean) => {
    setSelectAll(true);
    props.onCleanSelection(props.filter.field);
  }

  const setSelectAll = (selected: boolean): void => {
    let actualOptionAll: SingleOptionProp = optionAll;
    actualOptionAll.selected = selected;
    setOptionAll(actualOptionAll);
  }

  const allOption = <SingleOption 
                key={optionAll.code} 
                option={optionAll} 
                onChange={onSelectAll}/>

  const categories = props.filter.options.sort((option, anotherOption) => option.label.localeCompare(anotherOption.label) * -1)
  .slice(0, showOptionsQty)
  .map(option =>
    <SingleOption 
      key = {option.code} 
      option = {option} 
      onChange = {(selected: boolean):void => {props.onChange(props.filter.field, option.code, selected)}}
      label = {option.code === withoutCategory ? <Box>Otros</Box> : <Category stars={parseInt(option.code)}/>}
    />
  );

  const options = props.filter.options
    .slice(0, showOptionsQty)
    .map(option =>
      <SingleOption 
        key = {option.code} 
        option = {option} 
        onChange = {(selected: boolean):void => {props.onChange(props.filter.field, option.code, selected)}}
      />
    );

  const showMore = () => showAll 
  ? <Box onClick={toggleShowAll} className={classes.showMoreOption}>Mostrar menos <KeyboardArrowUp/></Box>
  : <Box onClick={toggleShowAll} className={classes.showMoreOption}>Mostrar todos <KeyboardArrowDown/></Box>;

  const filterBody = () => display
  ? <Box>
      <Box> {allOption} </Box>
      <Box> {props.filter.field == "category" ? categories : options} </Box>
      <Box className={classes.showMoreSection}> {showMore()} </Box>
    </Box>
  : null;

  return <Box>
            <Box>
              <FilterHeader label={props.filter.label} onChange={onChangeDisplay} display = {display}/>
            </Box>
            {filterBody()}
          </Box>;
}

export default SingleOptionFilter;