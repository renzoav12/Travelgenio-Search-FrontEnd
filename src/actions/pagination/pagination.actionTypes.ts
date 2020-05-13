import { Action } from "redux";
import { Pagination } from "../../model/search";

export const SEARCH_PAGINATION_PAGE = "SEARCH_PAGINATION_PAGE";
export const SEARCH_PAGINATION_UPDATE = "SEARCH_PAGINATION_UPDATE";

export interface PaginationUpdateAction
  extends Action<typeof SEARCH_PAGINATION_UPDATE> {
  pagination: Pagination;
}

export interface PaginationChangeAction
  extends Action<typeof SEARCH_PAGINATION_PAGE> {
  page: number;
}

export type PaginationActionTypes =
  | PaginationChangeAction
  | PaginationUpdateAction;
