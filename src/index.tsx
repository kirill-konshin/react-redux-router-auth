import React from 'react';
import ReactDOM from 'react-dom';
import createStore from "./lib/store";
import Router from './pages/Router';

const store = createStore();

ReactDOM.render(<Router store={store} />, document.getElementById('root'));

if (module['hot']) {
    module['hot'].accept();
}