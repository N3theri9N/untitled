import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Dropdown, Menu } from 'antd'

import { Provider } from "react-redux"; // 둘을 연결하는 매개
import {applyMiddleware, createStore } from "redux";
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createstroeWithMiddleward = applyMiddleware( promiseMiddleware, ReduxThunk)(createStore);
//미들웨어가 promiseMiddleware 랑 ReduxThunk 를 받을 수 있게한다.


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={ createstroeWithMiddleward(Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
          ) }>
          <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// src 폴더에서 웹팩이 관리해준다 ( 모아준다. )
reportWebVitals();
