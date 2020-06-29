import React, { FunctionComponent, useState } from "react";
import { Paper, Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ViewListIcon from "@material-ui/icons/ViewList";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import classnames from "classnames";

interface Props {
  title: JSX.Element;
  viewSelected?: ViewType;
  onChange: (view: ViewType) => void;
  showViewIcons: boolean;
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
  })
);

const SearchBar: FunctionComponent<Props> = (props) => {
  const [listView, setListView] = useState(
    !props.viewSelected || props.viewSelected.valueOf === ViewType.List.valueOf
  );

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

  return (
    <Paper className={classes.container}>
      <Box>{props.title}</Box>
      {icons}
    </Paper>
  );
};

export default SearchBar;
