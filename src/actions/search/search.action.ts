
import {SearchFetchAction} from './searchFetchActions';
import {SearchBoxAction} from './searchBoxActions';
import {FilterBoxAction} from './searchFilterActions';

export type SearchAction = 
| SearchFetchAction 
| SearchBoxAction
| FilterBoxAction;