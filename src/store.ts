import { createStore, combineReducers, applyMiddleware, compose, /* compose */ } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';

import { searchReducer } from './reducers/searchReducer';

import { Search } from './model/search';
import { RootAction } from './actions/action';
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { history } from './history';

export interface RootState {
    readonly search: Search;
    readonly router: any;
}

const rootReducer = combineReducers<RootState>({
    search: searchReducer,
    router: connectRouter(history),
});

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            reduxThunk as ThunkMiddleware<RootState, RootAction>
        )
    )
);