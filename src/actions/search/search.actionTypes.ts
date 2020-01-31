import { Action } from "redux";
import { CardProps } from "../../components/Card/Card";
import { SearchFilterResponse } from "../../model/search";

export const SEARCH_FETCH_START = 'SEARCH_FETCH_START'
export const SEARCH_FETCH_SUCCESS = 'SEARCH_FETCH_SUCCESS'
export const SEARCH_FETCH_FAILED = 'SEARCH_FETCH_FAILED'
export const SEARCH_ACCOMMODATION_UPDATE = 'SEARCH_ACCOMMODATION_UPDATE'
export const SEARCH_FILTER_UPDATE = 'SEARCH_FILTER_UPDATE'
export const PAGE_FETCH_START = 'PAGE_FETCH_START'
export const PAGE_FETCH_SUCCESS = 'PAGE_FETCH_SUCCESS'
export const PAGE_FETCH_FAILED = 'PAGE_FETCH_FAILED'

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

export interface PageFetchStartAction extends Action<typeof PAGE_FETCH_START> {
}

export interface PageFetchFailedAction extends Action<typeof PAGE_FETCH_SUCCESS> {
}

export interface PageFetchSuccessAction extends Action<typeof PAGE_FETCH_FAILED> {
}

export type SearchActionTypes =
    | SearchFetchStartAction
    | SearchFetchFailedAction
    | SearchFetchSuccessAction
    | SearchAccommodationUpdateAction
    | SearchFilterUpdateAction
    | PageFetchStartAction
    | PageFetchFailedAction
    | PageFetchSuccessAction;