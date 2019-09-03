import { createStore, combineReducers, applyMiddleware, /* compose */ } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';

import { accommodationRateSearchReducer, AccommodationRateSearchState } from './reducers/accommodationRateSearchReducer';
import { AccommodationRateSearchAction } from './actions/accommodationRateSearchActions';

export interface RootState {
    readonly search: AccommodationRateSearchState;
}

const rootReducer = combineReducers<RootState>({
    search: accommodationRateSearchReducer
});

export type RootActions = AccommodationRateSearchAction; // | OtherAction | etc.

export const store = createStore(
    rootReducer,
    //composeWithDevTools(
        applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
    //)
);
