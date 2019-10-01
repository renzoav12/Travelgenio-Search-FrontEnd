import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import Root from './components/Root/root';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

serviceWorker.unregister();