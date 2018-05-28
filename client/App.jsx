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
import Thread from "./containers/thread/thread.jsx";
import BanPage from "./containers/mod/mod.jsx";
import LoginPage from "./containers/login/login.jsx";

//import reducers 
import homeReducer from "./containers/home/homeReducer.js";
import boardCatalogReducer from "./containers/board/boardCatalogReducer.js";
import threadReducer from "./containers/thread/threadReducer.js";
import loginReducer from "./containers/login/loginReducer.js";
import banReducer from "./containers/mod/modReducer.js";

//import sagas
import sagas from "./sagas.js";

//import private route
import PrivateRoute from "./auth/privateRoute.jsx";

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
    homeReducer,
    boardCatalogReducer,
    threadReducer,
    loginReducer,
    banReducer,
    router: routerReducer
  }),
  applyMiddleware(middleware),
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

sagaMiddleware.run(sagas);


const App = () => (
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/board/:board_id" component={BoardCatalog}/>
        <Route path="/thread/:thread_id" component={Thread}/>
        <Route path="/login" component={LoginPage}/>
        <PrivateRoute path="/bans"  component={BanPage}/>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
