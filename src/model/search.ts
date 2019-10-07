import { SearchCardProps } from "../components/SearchCard/SearchCard";
import { SearchBoxState } from "../components/SearchBox/SearchBox";
import { ValueFilterProp } from "../components/FilterBox/ValueFilter/ValueFilter";
import { RangeFilterProp } from "../components/FilterBox/RangeFilter/RangeFilter";
import { SingleOptionFilterProp } from "../components/FilterBox/SingleOptionFilter/SingleOptionFilter";

export interface SearchPagination {
    readonly size: number;
    readonly page: number;
}

export interface SearchPagination {
    readonly size: number;
    readonly page: number;
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

export interface SearchResponse {
    accommodations: SearchCardProps[];
    filters: SearchFilterResponse;
}

export interface Search {
    box: SearchBoxState;
    filters: SearchFilter;
    pagination: SearchPagination;
    accommodations: SearchCardProps[];
    loading: boolean;
    error: String | null
}