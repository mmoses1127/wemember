import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import {createRoot} from 'react-dom/client';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

const root = createRoot(document.getElementById("root"));

const renderApplicaton = () => {
  return root.render(
    <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
    </React.StrictMode>
  );
}

if(sessionStorage.getItem('X-CSRF-Token') === null || sessionStorage.getItem('currentUser') === null){
  store.dispatch(sessionActions.restoreSession()).then(renderApplicaton);
} else {
  renderApplicaton();
}
