import {
  SearchActionTypes,
  SEARCH_FETCH_START,
  SEARCH_FETCH_FAILED,
  SEARCH_FETCH_SUCCESS,
  SEARCH_ACCOMMODATION_UPDATE,
  SEARCH_FILTER_UPDATE,
  SEARCH_SORT_UPDATE,
  PAGE_FETCH_START,
  PAGE_FETCH_FAILED,
  PAGE_FETCH_SUCCESS,
  SEARCH_SORT_SELECT,
} from "./search.actionTypes";
import { ThunkAction } from "redux-thunk";
import { RootState, store } from "../../store";
import { SearchResponse, SearchFilterResponse, SortField } from "../../model/search";
import { AxiosResponse } from "axios";
import search from "../../api/search/search";
import { searchCreateRequest } from "./search.converts";
import { CardProps } from "../../components/Card/Card";
import { RootAction } from "../action";
import { searchPaginationUpdate } from "../pagination/pagination.action";
import {mapAccommodationUpdate} from "../map/map.action";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootAction>;

export function searchFetchStart(): SearchActionTypes {
  return {
    type: SEARCH_FETCH_START,
  };
}

export function searchFetchSuccess(): SearchActionTypes {
  return {
    type: SEARCH_FETCH_SUCCESS,
  };
}

export function searchFetchFailed(): SearchActionTypes {
  return {
    type: SEARCH_FETCH_FAILED,
  };
}

export function pageFetchStart(): SearchActionTypes {
  return {
    type: PAGE_FETCH_START,
  };
}

export function pageFetchSuccess(): SearchActionTypes {
  return {
    type: PAGE_FETCH_SUCCESS,
  };
}

export function pageFetchFailed(): SearchActionTypes {
  return {
    type: PAGE_FETCH_FAILED,
  };
}

export function searchAccommodationUpdate(
  accommodations: CardProps[]
): SearchActionTypes {
  return {
    type: SEARCH_ACCOMMODATION_UPDATE,
    accommodations: accommodations,
  };
}

export function searchFilterUpdate(
  filters: SearchFilterResponse
): SearchActionTypes {
  return {
    type: SEARCH_FILTER_UPDATE,
    filters: filters,
  };
}

export function searchSortUpdate(
  sortFields: SortField[]
): SearchActionTypes {
  return {
    type: SEARCH_SORT_UPDATE,
    sortFields,
  };
}

export function searchSortSelect(
  field: string,
  order: string
): SearchActionTypes {
  return {
    type: SEARCH_SORT_SELECT,
    field,
    order
  };
}

export const searchUpdate = (action: (x: SearchResponse) => void) => async (
  dispatch,
  getState: () => RootState
) => {
  const params = searchCreateRequest(getState());

  const url = `/hotels/search/${params.locationType}/${params.locationCode}/${params.checkIn}/${params.checkOut}/${params.occupancy}`;

  window.history.pushState({}, "", url);

  let isFirstPage = getState().search.pagination.number === 1;

  if (isFirstPage) {
    dispatch(searchFetchStart());
  } else {
    dispatch(pageFetchStart());
  }

  try {
    const response: AxiosResponse<SearchResponse> = await search.post(
      "/search",
      params
    );
    action({
      accommodations: response.data.accommodations,
      filters: response.data.filters,
      sort: response.data.sort,
      pagination: {
        first: response.headers["tg-page-first"],
        last: response.headers["tg-page-last"],
        number: response.headers["tg-page-number"],
        size: response.headers["tg-page-size"],
        elements: response.headers["tg-total-elements"],
        filteredElements: response.headers["tg-filtered-elements"],
        pages: response.headers["tg-total-pages"],
        loading: getState().search.pagination.loading,
      },
    });
  } catch (e) {
    console.error(e);
    if (isFirstPage) {
      dispatch(searchFetchFailed());
    } else {
      dispatch(pageFetchFailed());
    }
  }
  if (isFirstPage) {
    dispatch(searchFetchSuccess());
  } else {
    dispatch(pageFetchSuccess());
  }
};


export const thunkSort = (
  field: string,
  order: string
): ThunkResult<void> => async (dispatch) => {

  const mapView = store.getState().map.mapView;

  dispatch(searchSortSelect(field, order));
  
  dispatch(
    searchUpdate((searchResponse: SearchResponse) => {
      dispatch(searchAccommodationUpdate(searchResponse.accommodations));
      dispatch(searchFilterUpdate(searchResponse.filters));
      dispatch(searchSortUpdate(searchResponse.sort));
      dispatch(searchPaginationUpdate(searchResponse.pagination));

      if(!mapView) {
        dispatch(mapAccommodationUpdate(searchResponse.accommodations));
      }

    })
  );
};
