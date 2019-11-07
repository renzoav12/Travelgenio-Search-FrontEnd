import { Action } from "redux";
import { CardProps } from "../../components/Card/Card";
import { SearchFilterResponse } from "../../model/search";

export const SEARCH_FETCH_START = 'SEARCH_FETCH_START'
export const SEARCH_FETCH_SUCCESS = 'SEARCH_FETCH_SUCCESS'
export const SEARCH_FETCH_FAILED = 'SEARCH_FETCH_FAILED'
export const SEARCH_ACCOMMODATION_UPDATE = 'SEARCH_ACCOMMODATION_UPDATE'
export const SEARCH_FILTER_UPDATE = 'SEARCH_FILTER_UPDATE'

export interface SearchFetchStartAction extends Action<typeof SEARCH_FETCH_START> {
}

export interface SearchFetchFailedAction extends Action<typeof SEARCH_FETCH_SUCCESS> {
}

export interface SearchFetchSuccessAction extends Action<typeof SEARCH_FETCH_FAILED> {
}

export interface SearchAccommodationUpdateAction extends Action<typeof SEARCH_ACCOMMODATION_UPDATE> {
    accommodations: CardProps[];
}

export interface SearchFilterUpdateAction extends Action<typeof SEARCH_FILTER_UPDATE> {
    filters: SearchFilterResponse;
}

export type SearchActionTypes =
    | SearchFetchStartAction
    | SearchFetchFailedAction
    | SearchFetchSuccessAction
    | SearchAccommodationUpdateAction
    | SearchFilterUpdateAction;