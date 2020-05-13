import { Reducer } from "redux";
import {
  Search,
  SearchFilterResponse,
  SearchFilter,
  Pagination,
} from "../model/search";
import moment from "moment";
import { ValueFilterProp } from "../components/FilterBox/ValueFilter/ValueFilter";
import { SingleOptionFilterProp } from "../components/FilterBox/SingleOptionFilter/SingleOptionFilter";
import {
  RangeFilterProp,
  RangeProp,
} from "../components/FilterBox/RangeFilter/RangeFilter";
import {
  FilterType,
  FilterBoxSelected,
} from "../components/FilterBox/FilterBox";
import { SEARCH_BOX_CHANGE } from "../actions/searchBox/searchBox.actionTypes";
import { RootAction } from "../actions/action";
import { CardProps } from "../components/Card/Card";
import {
  SEARCH_FETCH_START,
  SEARCH_FETCH_FAILED,
  SEARCH_FETCH_SUCCESS,
  PAGE_FETCH_START,
  PAGE_FETCH_FAILED,
  PAGE_FETCH_SUCCESS,
  SEARCH_FILTER_UPDATE,
  SEARCH_ACCOMMODATION_UPDATE,
} from "../actions/search/search.actionTypes";

import {
  SEARCH_PAGINATION_PAGE,
  SEARCH_PAGINATION_UPDATE,
} from "../actions/pagination/pagination.actionTypes";
import {
  SEARCH_FILTER_CHANGE,
  SEARCH_FILTER_CLEAN,
} from "../actions/filterBox/filterBox.actionTypes";

const emptyPagination: Pagination = {
  number: 1,
  size: 10,
  first: true,
  last: true,
  pages: 1,
  elements: 0,
  filteredElements: 0,
  loading: false,
};

const emptyAccommodations: CardProps[] = [];

const initialState: Search = {
  box: {
    location: {
      code: "",
      type: "",
    },
    occupancy: {
      rooms: [
        {
          adults: 2,
          childrenAges: [],
        },
      ],
    },
    stay: {
      from: moment(),
      to: moment(),
    },
  },
  filters: new Map(),
  pagination: emptyPagination,
  accommodations: [],
  loading: false,
  stats: {
    totals: 0,
  },
  error: {
    exists: false,
  },
};

function convertFilters(searchFilter: SearchFilterResponse): SearchFilter {
  const filters: SearchFilter = new Map();

  searchFilter.singleValue.forEach((value: ValueFilterProp) => {
    filters.set(value.field, value);
    value.type = FilterType.Value;
  });

  searchFilter.rangeValue.forEach((value: RangeFilterProp) => {
    filters.set(value.field, value);
    value.type = FilterType.Range;
  });

  searchFilter.singleOption.forEach((value: SingleOptionFilterProp) => {
    filters.set(value.field, value);
    value.type = FilterType.SingleOption;
  });

  return filters;
}

function cleanFilters(searchFilters: SearchFilter): SearchFilter {
  let cleanSearchFilters: SearchFilter = new Map(searchFilters);
  cleanSearchFilters.forEach(
    (
      filter: ValueFilterProp | RangeFilterProp | SingleOptionFilterProp,
      key: string
    ) => {
      switch (filter.type) {
        case FilterType.SingleOption:
          const singleOptionFilter: SingleOptionFilterProp = filter as SingleOptionFilterProp;
          singleOptionFilter.options = [];
          break;
        case FilterType.Value:
          const valueFilter: ValueFilterProp = filter as ValueFilterProp;
          valueFilter.value = "";
          break;
        case FilterType.Range:
          const rangeFilter: RangeFilterProp = filter as RangeFilterProp;
          rangeFilter.value = undefined;
          rangeFilter.boundaries.min = 0;
          rangeFilter.boundaries.max = 0;
          break;
        default:
          break;
      }
    }
  );

  return cleanSearchFilters;
}

function filterApplySelected(
  filters: SearchFilter,
  selected: FilterBoxSelected
): SearchFilter {
  const newFilters: SearchFilter = new Map(filters);

  switch (selected.type) {
    case FilterType.SingleOption:
      const singleOptionFilter = filters.get(
        selected.field
      ) as SingleOptionFilterProp;

      if (selected.values.length > 0) {
        singleOptionFilter.options.forEach((option) => {
          if (selected.values.includes(option.code)) {
            option.selected = true;
          }
        });
      } else {
        singleOptionFilter.options.forEach((option) => {
          option.selected = false;
        });
      }

      newFilters.set(singleOptionFilter.field, singleOptionFilter);
      break;
    case FilterType.Value:
      const valueFilter = filters.get(selected.field) as ValueFilterProp;
      if (selected.values[0] !== "") {
        valueFilter.value = selected.values[0];
      } else {
        valueFilter.value = "";
      }
      break;

    case FilterType.Range:
      const rangeFilter = filters.get(selected.field) as RangeFilterProp;
      var range: RangeProp = rangeFilter.value!;
      if (range === undefined) {
        range = {
          min: Number(selected.values[0]),
          max: Number(selected.values[1]),
        };
      } else {
        range.min = Number(selected.values[0]);
        range.max = Number(selected.values[1]);
      }
      rangeFilter.value = range;
      break;
    default:
      break;
  }

  return newFilters;
}

export const searchReducer: Reducer<Search, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SEARCH_FETCH_START:
      return { ...state, loading: true };
    case SEARCH_FETCH_FAILED:
      return { ...state, loading: false };
    case SEARCH_FETCH_SUCCESS:
      return { ...state, loading: false };
    case PAGE_FETCH_START:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          loading: true,
        },
      };
    case PAGE_FETCH_FAILED:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          loading: false,
        },
      };
    case PAGE_FETCH_SUCCESS:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          loading: false,
        },
      };
    case SEARCH_PAGINATION_PAGE:
      var asd = {
        ...state,
        pagination: {
          ...state.pagination,
          number: action.page,
          size: state.pagination.size,
        },
      };
      return asd;
    case SEARCH_PAGINATION_UPDATE:
      return {
        ...state,
        pagination: {
          ...action.pagination,
        },
      };
    case SEARCH_BOX_CHANGE:
      return {
        ...state,
        box: {
          ...action.searchBoxState,
        },
        pagination: emptyPagination,
        accommodations: emptyAccommodations,
      };
    case SEARCH_FILTER_CHANGE:
      return {
        ...state,
        filters: filterApplySelected(state.filters, action.changed),
        pagination: emptyPagination,
        accommodations: emptyAccommodations,
      };
    case SEARCH_ACCOMMODATION_UPDATE:
      return {
        ...state,
        accommodations: action.accommodations,
      };
    case SEARCH_FILTER_UPDATE:
      return {
        ...state,
        filters: convertFilters(action.filters),
      };
    case SEARCH_FILTER_CLEAN:
      return {
        ...state,
        filters: cleanFilters(state.filters),
      };
    default:
      return state;
  }
};
