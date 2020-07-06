import React, { FunctionComponent, useState } from "react";
import { Paper, Box, Select, MenuItem } from "@material-ui/core";
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
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
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
      marginLeft: 10,
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
      <Box
        className={listStyles}
        onClick={() => {
          handleClick(ViewType.List);
        }}
      >
        <ViewListIcon />
      </Box>
      <Box
        className={mapStyles}
        onClick={() => {
          handleClick(ViewType.Map);
        }}
      >
        <LocationOnIcon />
      </Box>
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
      <Select
        value={selectedSortValue}
        onChange={sortChangeHandler}
        className={classes.sort}
      >
        <MenuItem value={notSelectedValue}>
          <Translate tkey={Keys.search.sort_by}/>
        </MenuItem>
       {sortFields}
      </Select>
    ) : null;

  return (
    <Paper className={classes.container}>
      <Box>{props.title}</Box>
      <Box>{sort}</Box>
      {icons}
    </Paper>
  );
};

export default SearchBar;
