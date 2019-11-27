import * as React from "react";
import * as ReactDOM from "react-dom";
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import {compose} from "recompose";
import {Router} from "react-router-dom";

import App from "./components/app/app.jsx";
import createAPI from "./api.js";
import appData from "./store/reducers/app-data/app-data.js";
import user from "./store/reducers/user/user.js";
import ActionCreator from "./store/actions/action-creator.js";
import history from "./history.js";

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const init = () => {
  const reducer = combineReducers({
    appData,
    user
  });
  const api = createAPI(() => history.push(`/login`));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
      )
  );
  const userData = localStorage.getItem(`userData`);

  if (userData) {
    store.dispatch(ActionCreator.singIn(JSON.parse(userData)));
  }

  ReactDOM.render(
      <Provider store={store} >
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();