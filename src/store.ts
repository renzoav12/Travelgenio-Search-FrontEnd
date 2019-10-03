import { createStore, combineReducers, applyMiddleware, /* compose */ } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';

import { searchBoxSearchReducer, SearchRequest } from './reducers/searchBoxSearchReducer';
import { AccommodationRateSearchAction } from './actions/searchBoxSearchActions';

export interface RootState {
    readonly search: SearchRequest;
}

const rootReducer = combineReducers<RootState>({
    search: searchBoxSearchReducer
});

export type RootActions = AccommodationRateSearchAction; // | OtherAction | etc.

export const store = createStore(
    rootReducer,
    //composeWithDevTools(
        applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
    //)
);
