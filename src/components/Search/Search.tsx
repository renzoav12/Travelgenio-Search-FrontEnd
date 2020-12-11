import React, { FunctionComponent, useState, useEffect } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import SearchBox, { SearchBoxState } from "@hotels/search-box";
import FilterBox, { FilterBoxSelected } from "../FilterBox/FilterBox";
import Result from "./Result/Result";
import { Pagination, SearchFilter, SortField } from "../../model/search";
import { CardProps } from "../Card/Card";
import {
  SuggestionHint,
  SuggestionEntry,
} from "@hotels/search-box/dist/Autocomplete/Autocomplete";
import { makeStyles, createStyles, Theme, useTheme, createMuiTheme } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import Keys from "@hotels/translation-keys";
import Translate, { translate } from "@hotels/translation";
import SearchBar, { ViewType } from "../SearchBar/SearchBar";
import SearchMap from "../SearchMap/SearchMap";
import { useMediaQuery } from "@material-ui/core";
import {SearchBoxPortal} from "@hotels/search-box";
import BottomOptions from "./SearchMobile/BottomOptions";


export interface SearchProps {
  initialSearch: SearchBoxState;
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

  sortFields: SortField[];
  sort: (field: string, order: string) => void;

  suggestions: SuggestionEntry[];

  enableView: (listView: boolean) => void;
  code: string | null;
  display: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: 20,
    },
    counter: {
      marginTop: 20,
    },
    counter_mobile: {
      marginTop: 0,
    },
    search: {
      marginTop: 20
    },
    filter: {
      marginTop: 20,
    },
    searchPortal: {
      marginTop: 18,
      width: "100%",
      display: "flex",
      justifyContent: "flex-end"
    },
    mapContainer: {
      marginTop: 20,
    },
    found_results: {
      [theme.breakpoints.down("xs")]:{
        fontSize: 16,
        fontWeight: 600 ,
        width: "100%",
      }
    },
    skeleton:{

    }
  })
);

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 760,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
})

const Search: FunctionComponent<SearchProps> = (props, context) => {

  const [listView, setListView] = useState(true);
  const [display, setDisplay] = useState<boolean>(props.display);

  const xs_down = useMediaQuery(theme.breakpoints.down("sm"));
  
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
        <Box className={classes.found_results}>
        <Translate
          tkey={Keys.search.x_accommodation_were_found}
          quantity={props.pagination.elements}
          values={interporlateValues}
        />
        </Box>
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

  const onChangeDisplay = () => {
        setDisplay(!display);
  }

    const showSearchBox = (       
          <Box className={classes.searchPortal}>
             {SearchBoxPortal(
                props.search.location.name === "init" ?
                props.suggestionName : props.search.location.name,
                props.search,
                props.onChange,
                props.onChangeSuggestionHint,
                props.suggestions,
                translate(context, Keys.common.change_your_destination),
                props.code === null? "" : props.code,
                display,
                onChangeDisplay,
                props.loading
              )} 
        </Box>
    );

    const showSearchBar = (
      <Grid item md={8} lg={9} xs={12}>
        <Grid item xs={12} className={classes.counter_mobile}>
            <BottomOptions displayModal={true}
                filters={props.filters}
                onChangeFilter={props.filtersOnChange}
                loading={props.loading}
                display={ xs_down? false : true}
                title={counter()}
                onChange={onChangeView}
                showViewIcons={props.accommodations.length > 0}
                sortFields={props.sortFields}
                sort={props.sort}
            />
        </Grid>
      {listView ? results : map}
      </Grid>
    );

  return (
    <Grid container alignItems="flex-start" spacing={4} className={classes.container}>
      {xs_down ? showSearchBox :
      <Grid item md={4} lg={3} xs={12}>  
        <Box className={classes.search}>
              <SearchBox
                init={props.initialSearch}
                suggestionName={props.suggestionName}
                onChange={props.onChange}
                onChangeSuggestionHint={props.onChangeSuggestionHint}
                horizontal={false}
                suggestions={props.suggestions}
                title={translate(context, Keys.common.change_your_destination)}
                locale={props.code === null? "" : props.code}
              />
        </Box>
        <Box className={classes.filter}>
          <FilterBox
            filters={props.filters}
            onChange={props.filtersOnChange}
            loading={props.loading}
            display={ xs_down? false : true }
          />
        </Box>       
      </Grid>
      }
      { xs_down ? showSearchBar :
      <Grid item md={8} lg={9} xs={12}>
        <Grid item xs={12} className={classes.counter}>
          <SearchBar
            title={counter()}
            onChange={onChangeView}
            showViewIcons={props.accommodations.length > 0}
            sortFields={props.sortFields}
            sort={props.sort}
          />
        </Grid>
        {listView ? results : map}
      </Grid>
      }
    </Grid>
  );
};

Search.contextTypes = { t: PropTypes.func };

export default Search;
