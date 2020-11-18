import React, { FunctionComponent, useState } from "react";
import { Paper, Box, Select, MenuItem, Tooltip, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ViewListIcon from "@material-ui/icons/ViewList";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import classnames from "classnames";
import { SortField } from "../../model/search";
import Translate from "@hotels/translation";
import Keys from "@hotels/translation-keys";

interface Props {
  title: JSX.Element;
  viewSelected?: ViewType;
  onChange: (view: ViewType) => void;
  showViewIcons: boolean;
  sortFields: SortField[];
  sort: (field: string, order: string) => void;
}

export enum ViewType {
  List,
  Map,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      }
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
    }
  })
);

const SearchBar: FunctionComponent<Props> = (props) => {
  const [listView, setListView] = useState(
    !props.viewSelected || props.viewSelected.valueOf === ViewType.List.valueOf
  );
  
  const notSelectedValue = "empty";
  const [selectedSortValue, setSelectedSortValue] = useState(notSelectedValue);

  const classes = useStyles();

  const listStyles = listView
    ? classnames(classes.selected, classes.icon)
    : classnames(classes.icon);

  const mapStyles = !listView
    ? classnames(classes.selected, classes.icon)
    : classnames(classes.icon);

  const handleClick = (viewType: ViewType): void => {
    setListView(viewType.valueOf() === ViewType.List.valueOf());
    props.onChange(viewType);
  };

  const icons: JSX.Element | null = props.showViewIcons ? (
    <Box className={classes.container}>
      <Tooltip title={<Translate tkey={Keys.search.see_list}/>} arrow>
        <Box
          className={listStyles}
          onClick={() => {
            handleClick(ViewType.List);
          }}
        >
          <ViewListIcon />
        </Box>
      </Tooltip>
      <Tooltip title={<Translate tkey={Keys.search.see_map}/>} arrow>
        <Box
          className={mapStyles}
          onClick={() => {
            handleClick(ViewType.Map);
          }}
        >
          <LocationOnIcon />
        </Box>
      </Tooltip>
    </Box>
  ) : null;

  const getMenuItemValue = (sortField: SortField): string => {
    return `${sortField.field}_${sortField.order}`;
  }

  const getTranslationKey = (sortField: SortField): string => {
    return Keys.search[`${sortField.field}_${sortField.order.toLocaleLowerCase()}`];
  }
  
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

  const sort: JSX.Element | null =
    props.sortFields.length > 0 && listView && props.showViewIcons ? (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="sort-label"><Translate tkey={Keys.search.sort_by}/></InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={selectedSortValue}
          onChange={sortChangeHandler}
          className={classes.sort}
          label={<Translate tkey={Keys.search.sort_by}/>}
        >
          <MenuItem value={notSelectedValue}>
            <Translate tkey={Keys.search.recommended}/>
          </MenuItem>
        {sortFields}
        </Select>
      </FormControl>
    ) : null;

  return (
    <Paper className={classes.container}>
      <Box className={classes.title}>{props.title}</Box>
      <Box className={classes.iconsSortContainer}>{icons}{sort}</Box>
    </Paper>
  );
};

export default SearchBar;
