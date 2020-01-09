import { CardProps } from "../components/Card/Card";
import { SearchBoxState } from "../components/SearchBox/SearchBox";
import { ValueFilterProp } from "../components/FilterBox/ValueFilter/ValueFilter";
import { RangeFilterProp } from "../components/FilterBox/RangeFilter/RangeFilter";
import { SingleOptionFilterProp } from "../components/FilterBox/SingleOptionFilter/SingleOptionFilter";


export interface SearchParams {
    accommodationId: string;
    stay: StayParams;
    occupancy: string;
}

interface StayParams {
    from: string;
    to: string;
}

export interface SearchHeaderParameters {
    readonly country: string
}

export interface SearchFetchParameters {
    readonly locationType: string,
    readonly locationCode: string,
    readonly checkIn: string,
    readonly checkOut: string,
    readonly occupancy: string,
    readonly locale: string,
    readonly country: string,
    readonly size: number;
    readonly page: number;
    readonly filters: any;
}

export interface SearchFetchFilterParameters extends Map<string, Array<string>> {
}

export interface SearchPagination {
    readonly size: number;
    readonly page: number;
}

export interface SearchPagination {
    readonly size: number;
    readonly page: number;
}

export interface SearchStats {
    readonly totals: number;
}

interface Filter {
    readonly field: string;
    readonly label: String;
}

export interface SearchFilterResponse {
    readonly singleValue: Array<ValueFilterProp>;
    readonly rangeValue: Array<RangeFilterProp>;
    readonly singleOption: Array<SingleOptionFilterProp>;
}

export interface SearchFilter extends Map<string, 
ValueFilterProp
| RangeFilterProp
| SingleOptionFilterProp> {
}

export interface SingleOption {
    readonly code: String;
    readonly label: String;
    readonly quantity: number;
    selected: boolean;
}

export interface SearchParameters {
    readonly type: string,
    readonly code: string,
    readonly checkIn: string,
    readonly checkOut: string,
    readonly occupancy: string,
    readonly language: string,
    readonly country: string,
    readonly size: number;
    readonly page: number;
}

export interface Pagination {
    first: boolean;
    last: boolean;
    number: number;
    size: number;
    elements: number;
    filteredElements: number;
    pages: number;
}

export interface SearchResponse {
    accommodations: CardProps[];
    filters: SearchFilterResponse;
    pagination: Pagination;
}

export interface Search {
    box: SearchBoxState;
    filters: SearchFilter;
    pagination: Pagination;
    accommodations: CardProps[];
    loading: boolean;
    stats: SearchStats;
    error: SearchError;
}

export interface SearchError {
    exists: boolean;
    code?: string;
    message?: string
}