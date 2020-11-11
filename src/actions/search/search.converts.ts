import { RootState } from "../../store";
import { SingleOptionFilterProp } from "../../components/FilterBox/SingleOptionFilter/SingleOptionFilter";
import { FilterType } from "../../components/FilterBox/FilterBox";
import { ValueFilterProp } from "../../components/FilterBox/ValueFilter/ValueFilter";
import {
  RangeFilterProp,
  RangeProp,
} from "../../components/FilterBox/RangeFilter/RangeFilter";
import {
  SearchFetchParameters,
  SearchFetchFilterParameters,
  SortRequest,
} from "../../model/search";

function mapToObject(o, m) {
  for (let [k, v] of m) {
    o[k] = v;
  }
}

export const searchCreateRequest = (
  rootState: RootState
): SearchFetchParameters => {
  const { location, stay, occupancy } = rootState.search.box;
  const filters: SearchFetchFilterParameters = searchCreateFilterRequest(
    rootState
  );
  const pageNumber: number = rootState.search.pagination.number;
  const pageSize: number = rootState.search.pagination.size;
  const jsonFilter = {};
  mapToObject(jsonFilter, filters);

  return {
    locationType: location.type,
    locationCode: location.code,
    checkIn: stay.from?.format("YYYY-MM-DD"),
    checkOut: stay.to?.format("YYYY-MM-DD"),
    occupancy: occupancy.rooms
      .map(
        (room) =>
          room.adults +
          (room.childrenAges.length === 0 ? "" : "-") +
          room.childrenAges.join("-")
      )
      .join("!"),
    page: pageNumber,
    pageSize: pageSize,
    filters: jsonFilter,
    sort: createSortParameter(rootState),
  };
};

const searchCreateFilterRequest = (
  rootState: RootState
): SearchFetchFilterParameters => {
  const query: SearchFetchFilterParameters = new Map();

  rootState.search.filters.forEach((filter) => {
    switch (filter.type) {
      case FilterType.SingleOption:
        const newFilter: SingleOptionFilterProp = filter as SingleOptionFilterProp;

        const codes: Array<string> = newFilter.options
          .filter((option) => option.selected)
          .map((option) => option.code);

        if (codes.length > 0) {
          query.set(newFilter.field, codes);
        }

        break;

      case FilterType.Value:
        const valueFilter = filter as ValueFilterProp;
        if (!(!valueFilter.value || valueFilter.value.length === 0)) {
          query.set(valueFilter.field, [valueFilter.value!]);
        }

        break;
      case FilterType.Range:
        const rangeFilter = filter as RangeFilterProp;
        if (!!rangeFilter.value) {
          const rangeProp: RangeProp = rangeFilter.value;
          if (rangeProp && (rangeProp.min || rangeProp.max)) {
            query.set(rangeFilter.field, [
              rangeProp.min.toString(),
              rangeProp.max.toString(),
            ]);
          }
        }

        break;
    }
  });

  return query;
};

const createSortParameter = (rootState: RootState): SortRequest | null => {
  const sortFieldSelected = rootState.search.sortFields.find(sortField => sortField.selected);
  return sortFieldSelected ? {...sortFieldSelected} : null;
}