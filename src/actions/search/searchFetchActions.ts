import search from '../../api/search/search';
import { ThunkAction } from 'redux-thunk';
import { Dispatch, Action } from 'redux';
import { RootState, RootActions } from '../../store';
import { AxiosResponse } from 'axios';
import { SearchResponse, Search, SearchFilter } from '../../model/search';
import { SearchActionTypes } from './search.actionTypes'
import { SingleOptionFilterProp } from '../../components/FilterBox/SingleOptionFilter/SingleOptionFilter';
import { FilterType } from '../../components/FilterBox/FilterBox';

export interface SearchHeaderParameters {
    readonly country: string
}

interface SearchFetchParameters {
    readonly locationType: string,
    readonly locationCode: string,
    readonly checkIn: string,
    readonly checkOut: string,
    readonly occupancy: string,
    readonly language: string,
    readonly country: string,
    readonly size: number;
    readonly page: number;
    readonly filters: any;
}

interface SearchFetchFilterParameters extends Map<String, Array<String>> {
}

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;


export interface SearchFetchStart extends Action<SearchActionTypes.FETCH_START> {
}

export interface SearchFetchSuccess extends Action<SearchActionTypes.FETCH_SUCCESS> {
    payload: SearchResponse;
}

export interface SearchFetchFailed extends Action<SearchActionTypes.FETCH_FAILED> {}

export interface SearchFilterChanged extends Action<SearchActionTypes.SAERCH_FILTER_CHANGED> {
    filter: SearchFilter;
}


export interface SearchFetchPage extends Action<SearchActionTypes.FETCH_PAGE> {
    page: number;
    size: number;
}

export interface SearchIncrementPageAction extends Action<SearchActionTypes.SEARCH_INCREMENT_PAGE> {}

export const searchFetchPage = (page: number, pageSize: number) => async (
    dispatch: <T extends Action<string>>(x: T) => void,
    getState: () => RootState
  ) => {
    //dispatch()
};

export const searchFetch = () => async (
    dispatch: <T extends Action<string>>(x: T) => void,
    getState: () => RootState
  ) => {
    //dispatch()
};

export const fetchSearch2 = () => async (
    dispatch: <T extends Action<string>>(x: T) => void,
    getState: () => RootState
  ) => {
};

export const searchUpdateAsync = () => async (
    dispatch: <T extends Action<string>>(x: T) => void,
    getState: () => RootState
  ) => {
};

export const searchUpdate = (): ThunkResult<void> => async (
    dispatch: <T extends Action<string>>(x: T) => void,
    getState: () => RootState
  ) => {
    const params = searchCreateRequest(getState());

    dispatch<SearchFetchStart>({
        type: SearchActionTypes.FETCH_START
    })

    try {
        const response: AxiosResponse<SearchResponse> = await search.post('/search', params);
        dispatch<SearchFetchSuccess>({
            type: SearchActionTypes.FETCH_SUCCESS,
            payload: response.data
        })
        //handleFetchSearchSuccess(dispatch, response.data);
    } catch (e) {
        dispatch<SearchFetchFailed>({
            type: SearchActionTypes.FETCH_FAILED
        })
        //handleFetchSearchFailed(dispatch);
    }
};

interface SearchFetchFilterParameters extends Map<String, Array<String>> {
    
}

function mapToObject(o, m) {
    for(let[k,v] of m) { o[k] = v }
}

const searchCreateRequest = (rootState: RootState): SearchFetchParameters => {
    const {location, stay, occupancy} = rootState.search.box;
    const filters: SearchFetchFilterParameters = searchCreateFilterRequest(rootState);
    const jsonFilter = {};
    mapToObject(jsonFilter, filters);
    return {
        locationType: location.type,
        locationCode: location.code,
        checkIn: stay.from.toISOString().substring(0, 10),
        checkOut: stay.to.toISOString().substring(0, 10),
        occupancy: occupancy.rooms.map(room => room.adults + ((room.childrenAges.length === 0) ?"" : "-") +room.childrenAges.join("-")).join("!"),
        country: 'US',
        language: 'en',
        page: 0,
        size: 20,
        filters: jsonFilter
    };
};

const searchCreateFilterRequest = (rootState: RootState): SearchFetchFilterParameters => {
    const query: SearchFetchFilterParameters = new Map;

    rootState.search.filters.forEach((filter) => {
        if (filter.type == FilterType.SingleOption) {
            const newFilter: SingleOptionFilterProp = filter as SingleOptionFilterProp;

            const codes: Array<String> = newFilter.options
            .filter(option => option.selected)
            .map(option => option.code);

            query.set(newFilter.field, codes);
        }
    })

    return query;
};

export const handleSearchIncrementOnePage = () => async (
    dispatch: (action: any) => void,
    getState: () => RootState
  ) => {
    dispatch({
        type: SearchActionTypes.SEARCH_INCREMENT_PAGE
    });
    dispatch(searchUpdate());
};

export const handleSearchIncrementOnePage2 = (dispatch: Dispatch) => {
    dispatch({
        type: SearchActionTypes.SEARCH_INCREMENT_PAGE,
    });
};

export const handleFetchSearch = (dispatch: Dispatch) => {
    dispatch({
        type: SearchActionTypes.FETCH_START,
    });
};

export const handleFetchSearchSuccess = (
    dispatch: Dispatch<SearchFetchSuccess>,
    response: SearchResponse
) => {
    dispatch({
        type: SearchActionTypes.FETCH_SUCCESS,
        payload: response
    });
};

export const handleFetchSearchFailed = (dispatch: Dispatch<SearchFetchFailed>) => {
    dispatch({
        type: SearchActionTypes.FETCH_FAILED
    });
};


export type SearchFetchAction = 
    | SearchFetchStart
    | SearchFetchSuccess
    | SearchFetchFailed
    | SearchFetchPage
    | SearchIncrementPageAction;