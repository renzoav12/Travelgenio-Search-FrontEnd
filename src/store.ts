import { createStore, combineReducers, applyMiddleware, compose,} from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { searchReducer } from './reducers/searchReducer';
import { searchSuggestionReducer, SearchSuggestion } from './reducers/searchSuggestionReducer';
import { Search } from './model/search';
import { RootAction } from './actions/action';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { history } from './history';
import { i18nState } from 'redux-i18n';

export interface RootState {
    readonly search: Search;
    readonly searchSuggestion: SearchSuggestion;
    readonly router: any;
    readonly i18nState: any;
}

const rootReducer = combineReducers<RootState>({
    search: searchReducer,
    searchSuggestion: searchSuggestionReducer,
    router: connectRouter(history),
    i18nState: i18nState
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