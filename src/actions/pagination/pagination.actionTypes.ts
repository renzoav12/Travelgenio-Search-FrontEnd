import { Action } from 'redux';

export const SEARCH_PAGINATION_PAGE = 'SEARCH_PAGINATION_PAGE'

export interface PaginationChangeAction extends Action<typeof SEARCH_PAGINATION_PAGE> {
    page: number;
}

export type PaginationActionTypes = PaginationChangeAction;