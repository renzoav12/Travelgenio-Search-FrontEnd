import { createStore, combineReducers, applyMiddleware} from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { searchReducer } from './reducers/searchReducer';
import { searchSuggestionReducer, SearchSuggestion } from './reducers/searchSuggestionReducer';
import { Search } from './model/search';
import { RootAction } from './actions/action';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { history } from './history';
import { i18nState } from 'redux-i18n';
import { cobrandReducer } from '@hotels/header-footer';
import { MapState, mapReducer } from './reducers/mapReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { localeReducer, LocaleState } from './reducers/localeReducer';

export interface RootState {
    readonly search: Search;
    readonly searchSuggestion: SearchSuggestion;
    readonly locale: LocaleState;
    readonly router: any;
    readonly i18nState: any;
    readonly cobrand: any;
    readonly map: MapState;
}

const rootReducer = combineReducers<RootState>({
    search: searchReducer,
    searchSuggestion: searchSuggestionReducer,
    locale: localeReducer,
    router: connectRouter(history),
    i18nState: i18nState,
    cobrand: cobrandReducer,
    map: mapReducer,
});

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            reduxThunk as ThunkMiddleware<RootState, RootAction>
        )
    )
);