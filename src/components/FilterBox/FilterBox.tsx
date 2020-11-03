import React, { FunctionComponent , useState} from "react";
import SingleOptionFilter, {
  SingleOptionFilterProp,
} from "./SingleOptionFilter/SingleOptionFilter";
import RangeFilter, {
  RangeFilterProp,
  RangeProp,
} from "./RangeFilter/RangeFilter";
import ValueFilter, { ValueFilterProp } from "./ValueFilter/ValueFilter";
import { RangeOptionFilterProp } from "./RangeOptionFilter/RangeOptionFilter";
import { Grid, Paper, Typography, Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Keys from "@hotels/translation-keys";
import { translate } from "@hotels/translation";
import PropTypes from "prop-types";
import FilterHeader from "./FilterHeader/FilterHeader";

export interface FilterBoxSelected {
  type: FilterType;
  field: string;
  values: string[];
}

export interface FilterBoxProps {
  filters: Map<
    string,
    | ValueFilterProp
    | RangeFilterProp
    | SingleOptionFilterProp
    | RangeOptionFilterProp
  >;
  onChange: (filter: FilterBoxSelected) => void;
  loading: boolean;
}

export enum FilterType {
  Value,
  Range,
  SingleOption,
  RangeOption,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterBox: {
      width: "100%",
    },
    filter: {
      paddingTop: 20,
      paddingBottom: 20,
      borderBottomColor: theme.palette.divider,
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
    },
  })
);

const FilterBox: FunctionComponent<FilterBoxProps> = (props, context) => {
  const classes = useStyles();
  const [display, setDisplay] = useState<boolean>(false);

  const onChangeValue = (field: string, value: string): void => {
    sendOnChangeEvent(field, FilterType.Value, [value]);
  };

  const onChangeDisplay = (show: boolean): void => {
    setDisplay(show);
  };

  const onChangeRange = (field: string, values: RangeProp): void => {
    sendOnChangeEvent(field, FilterType.Range, [
      values.min.toString(),
      values.max.toString(),
    ]);
  };

  const onChangeSingleOption = (
    field: string,
    code: string,
    selected: boolean
  ): void => {
    let changedFilter: any = props.filters.get(field);
    if (changedFilter) {
      let selectedCodes: Array<string> = changedFilter.options
        .filter((option) => option.selected && option.code !== code)
        .map((option) => option.code);

      if (selected) {
        selectedCodes.push(code);
      }

      sendOnChangeEvent(field, FilterType.SingleOption, selectedCodes);
    }
  };

  const onCleanSelectionSingleOption = (field: string) => {
    sendOnChangeEvent(field, FilterType.SingleOption, []);
  };

  const sendOnChangeEvent = (
    field: string,
    type: FilterType,
    values: Array<string>
  ): void => {
    props.onChange({ field, type, values });
  };

  const isValueFilter = (
    filter:
      | ValueFilterProp
      | RangeFilterProp
      | SingleOptionFilterProp
      | RangeOptionFilterProp
  ): boolean => {
    return FilterType.Value === filter.type;
  };

  const isRangeFilter = (
    filter:
      | ValueFilterProp
      | RangeFilterProp
      | SingleOptionFilterProp
      | RangeOptionFilterProp
  ): boolean => {
    return FilterType.Range === filter.type;
  };

  const isSingleOptionFilter = (
    filter:
      | ValueFilterProp
      | RangeFilterProp
      | SingleOptionFilterProp
      | RangeOptionFilterProp
  ): boolean => {
    return FilterType.SingleOption === filter.type;
  };

  const renderFilters = () => {
    return Array.from(props.filters.values())
      .sort((filter, anotherFilter) => {
        return filter.order - anotherFilter.order;
      })
      .map((filter) => renderFilter(filter));
  };

  const renderFilter = (
    filter:
      | ValueFilterProp
      | RangeFilterProp
      | SingleOptionFilterProp
      | RangeOptionFilterProp
  ) => {
    let element: any = null;

    if (isValueFilter(filter)) {
      element = renderValueFilter(filter);
    } else if (isRangeFilter(filter)) {
      element = renderRangeFilter(filter);
    } else if (isSingleOptionFilter(filter)) {
      element = renderSingleOptionFilter(filter);
    }

    return element;
  };

  const renderValueFilter = (filter: any) => {
    return (
      <Box key={filter.field} className={classes.filter}>
        <ValueFilter
          filter={filter}
          onChange={onChangeValue}
          display={!props.loading}
        />
      </Box>
    );
  };

  const renderRangeFilter = (filter: any) => {
    return (
      <Box key={filter.field} className={classes.filter}>
        <RangeFilter
          filter={filter}
          onChange={onChangeRange}
          display={!props.loading}
        />
      </Box>
    );
  };

  const renderSingleOptionFilter = (filter: any) => {
    return (
      <Box key={filter.field} className={classes.filter}>
        <SingleOptionFilter
          initialShowQty={2}
          filter={filter}
          onChange={onChangeSingleOption}
          onCleanSelection={onCleanSelectionSingleOption}
          display={!props.loading}
        />
      </Box>
    );
  };

  const filterBody = () => display ? renderFilters(): null;
    
  return props.filters.size > 0 ? (
    
   <Paper className={classes.filterBox}>
      <Grid container item>

      <Grid item xs={12}>
        <FilterHeader
          label={translate(context, Keys.search.filter_by)}
          onChange={onChangeDisplay}
          display={display}>
        </FilterHeader>
        </Grid>
        <Grid item xs={12}>
          {filterBody()}
        </Grid>
      </Grid>
    </Paper>
  ) : null;
};

FilterBox.contextTypes = { t: PropTypes.func };

export default FilterBox;
