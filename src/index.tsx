import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/store';
import Router from './pages/Router';

const {store, persistor} = createStore();

ReactDOM.render(<Router store={store} persistor={persistor} />, document.getElementById('root'));

if (module['hot']) {
    module['hot'].accept();
}
