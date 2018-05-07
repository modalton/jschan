import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';

import Home from "./containers/home/home.jsx";
import BoardCatalog from "./containers/board/board.jsx";

//import reducers from './reducers';
import homeReducer from "./containers/home/homeReducer.js";
import boardCatalogReducer from "./containers/board/boardCatalogReducer.js";
//import saga
import {mySaga} from "./containers/home/homeSaga.js";
import {myBoardSaga} from "./containers/board/boardSaga.js";
//import sagas from "./sagas.js";
//  browser history
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Build saga middleware
const sagaMiddleware = createSagaMiddleware();

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    //    ...reducers,
    homeReducer,
    router: routerReducer
  }),
  applyMiddleware(middleware),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(myBoardSaga,mySaga);
//sagaMiddleware.run(myBoardSaga);


const App = () => (
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/board" component={BoardCatalog}/>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
