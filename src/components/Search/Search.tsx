import React, { FunctionComponent } from "react";
import { Grid, Box } from "@material-ui/core";
import SearchBox, { SearchBoxState } from "@hotels/search-box";
import FilterBox, { FilterBoxSelected } from "../FilterBox/FilterBox";

import Result from "./Result/Result";
import { Pagination, SearchFilter } from "../../model/search";
import { CardProps } from "../Card/Card";
import {
  SuggestionHint,
  SuggestionEntry,
} from "@hotels/search-box/dist/Autocomplete/Autocomplete";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import Keys from "@hotels/translation-keys";
import Translate, {translate} from "@hotels/translation";

export interface SearchProps {
  search: SearchBoxState;
  suggestionName: string;
  onChange: (state: SearchBoxState) => void;
  onChangeSuggestionHint: (suggestionHint: SuggestionHint) => void;

  loading: boolean;
  pagination: Pagination;
  accommodations: CardProps[];
  loadNextPage: () => void;
  selected: (id: string) => void;

  filtersOnChange: (searchBoxState: FilterBoxSelected) => void;
  filters: SearchFilter;

  suggestions: SuggestionEntry[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      marginTop: 20,
    },
    filter: {
      marginTop: 20,
    },
  })
);

const Search: FunctionComponent<SearchProps> = (props, context) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="flex-start" spacing={2}>
      <Grid item md={4} lg={3}>
        <Box className={classes.search}>
          <SearchBox
            init={props.search}
            suggestionName={props.suggestionName}
            onChange={props.onChange}
            onChangeSuggestionHint={props.onChangeSuggestionHint}
            horizontal={false}
            suggestions={props.suggestions}
            title={translate(context,Keys.common.change_your_destination)}
          />
        </Box>
        <Box className={classes.filter}>
          <FilterBox
            filters={props.filters}
            onChange={props.filtersOnChange}
            loading={props.loading}
          />
        </Box>
      </Grid>
      <Grid item md={8} lg={9}>
        <Result
          accommodations={props.accommodations}
          loadNextPage={props.loadNextPage}
          loading={props.loading}
          selected={props.selected}
          pagination={props.pagination}
        />
      </Grid>
    </Grid>
  );
};

Search.contextTypes = { t: PropTypes.func };

export default Search;
