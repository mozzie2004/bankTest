import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import firebase from 'firebase/app'
import App from './components/app/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

firebase.initializeApp({
  apiKey: "AIzaSyC8NUfWwxTV4bMTk2hUZzecIxE_RWv_2VU",
  authDomain: "banks-f810c.firebaseapp.com",
  projectId: "banks-f810c",
  storageBucket: "banks-f810c.appspot.com",
  messagingSenderId: "197065953102",
  appId: "1:197065953102:web:9429de158be05a5226181f"
});

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);
