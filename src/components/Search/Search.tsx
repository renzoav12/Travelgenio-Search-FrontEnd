import React, { FunctionComponent, useState, useEffect } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
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
import Translate, { translate } from "@hotels/translation";
import SearchBar, { ViewType } from "../SearchBar/SearchBar";
import SearchMap from "../SearchMap/SearchMap";

export interface SearchProps {
  search: SearchBoxState;
  suggestionName: string;
  onChange: (state: SearchBoxState) => void;
  onChangeSuggestionHint: (suggestionHint: SuggestionHint) => void;

  loading: boolean;
  loadingMap: boolean;
  pagination: Pagination;
  accommodations: CardProps[];
  mapAccommodations: CardProps[];
  loadNextPage: () => void;
  selected: (id: string) => void;

  filtersOnChange: (searchBoxState: FilterBoxSelected) => void;
  filters: SearchFilter;

  suggestions: SuggestionEntry[];

  enableView: (listView: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: 20,
    },
    counter: {
      marginTop: 20,
    },
    search: {
      marginTop: 20,
    },
    filter: {
      marginTop: 20,
    },
    mapContainer: {
      marginTop: 20,
    },
  })
);

const Search: FunctionComponent<SearchProps> = (props, context) => {
  const [listView, setListView] = useState(true);

  useEffect(() => {
    props.enableView(false);
  }, []);

  const classes = useStyles();

  const onChangeView = (viewType: ViewType): void => {
    let list = viewType.valueOf() === ViewType.List.valueOf();
    if(list === !listView) {
      setListView(list);
      props.enableView(!list);
    }
  };

  const foundAccommodationsLabel = () => {
    const eqElements =
      props.pagination.filteredElements === props.pagination.elements;

    let interporlateValues = {};

    if (eqElements) {
      interporlateValues = { n: props.pagination.elements };
    } else {
      const { filteredElements: n, elements: m } = props.pagination;
      interporlateValues = { n, m };
    }

    if (props.pagination.elements > 0) {
      return (
        <Translate
          tkey={Keys.search.x_accommodation_were_found}
          quantity={props.pagination.elements}
          values={interporlateValues}
        />
      );
    } else {
      return (
        <Translate
          tkey={Keys.common.there_is_not_availability_for_x_and_y}
          values={{
            n: props.search.stay.from?.format("DD MMM YYYY"),
            m: props.search.stay.to?.format("DD MMM YYYY"),
          }}
        />
      );
    }
  };

  const counter = () => {
    return props.loading ? (
      <Typography variant="h1">
        <Translate tkey={Keys.search.searching_accommodations} />
      </Typography>
    ) : (
      <Typography variant="h1">{foundAccommodationsLabel()}</Typography>
    );
  };

  const results = (
    <Result
      accommodations={props.accommodations}
      loadNextPage={props.loadNextPage}
      loading={props.loading}
      selected={props.selected}
      pagination={props.pagination}
    />
  );

  const map = (
    <SearchMap
      accommodations={props.mapAccommodations}
      select={props.selected}
      className={classes.mapContainer}
      loading={props.loadingMap}
    />
  );

  return (
    <Grid container alignItems="flex-start" spacing={2} className={classes.container}>
      <Grid item md={4} lg={3}>
        <Box className={classes.search}>
          <SearchBox
            init={props.search}
            suggestionName={props.suggestionName}
            onChange={props.onChange}
            onChangeSuggestionHint={props.onChangeSuggestionHint}
            horizontal={false}
            suggestions={props.suggestions}
            title={translate(context, Keys.common.change_your_destination)}
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
        <Grid item xs={12} className={classes.counter}>
          <SearchBar
            title={counter()}
            onChange={onChangeView}
            showViewIcons={props.accommodations.length > 0}
          />
        </Grid>
        {listView ? results : map}
      </Grid>
    </Grid>
  );
};

Search.contextTypes = { t: PropTypes.func };

export default Search;
