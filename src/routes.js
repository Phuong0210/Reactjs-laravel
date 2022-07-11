import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store/store.js';
import { Provider } from 'react-redux';
import App from './containers/App.jsx';
import Products from './containers/shop/Products.jsx';
import Basket from './containers/shop/Basket.jsx';

const routes = () => (

    <AppContainer>
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                </Route>
            </Router>
        </Provider>
    </AppContainer>

);

export default routes;
