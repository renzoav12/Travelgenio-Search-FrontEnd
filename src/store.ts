import { createStore, combineReducers, applyMiddleware, /* compose */ } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';

import { searchReducer } from './reducers/searchReducer';
import { SearchAction } from './actions/search/search.action';

import { Search } from './model/search';

export interface RootState {
    readonly search: Search;
}

const rootReducer = combineReducers<RootState>({
    search: searchReducer
});

export type RootActions = SearchAction; // | OtherAction | etc.

export const store = createStore(
    rootReducer,
    //composeWithDevTools(
        applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
    //)
);
