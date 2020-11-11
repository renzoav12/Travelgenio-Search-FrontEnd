import React, { FunctionComponent } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import Keys from "@hotels/translation-keys";
import { translate } from "@hotels/translation";
import { useMediaQuery } from "@material-ui/core";

interface Props {
  label: string;
  onChange: (display: boolean) => void;
  display: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterHeader: {
      display: "flex",
      justifyContent: "space-between",
      cursor: "pointer",
      marginBottom: 12,
    },
  })
);

const FilterHeader: FunctionComponent<Props> = (props, context) => {

  
  const classes = useStyles();

  const toggleDisplay = (): void => {
    props.onChange(!props.display);
  };
    
  const arrow = () =>
    props.display ? <KeyboardArrowUp /> : <KeyboardArrowDown />;

  const label = Keys.search[`filter_${props.label}`];

  return (
    <Box className={classes.filterHeader} onClick={toggleDisplay}>
      <Typography variant="h1">
        {translate(context, label ? label : props.label)}
      </Typography>
      <Box>{arrow}</Box>
    </Box>
  );
};

FilterHeader.contextTypes = { t: PropTypes.func };

export default FilterHeader;
