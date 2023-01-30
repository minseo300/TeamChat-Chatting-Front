import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './modules';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import { RecoilRoot } from "recoil";

const store=createStore(rootReducer);
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
ReactDOM.render(
  <RecoilRoot>
    <Provider
      store={createStoreWithMiddleware(rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
          <App/>
    </Provider>
  </RecoilRoot>,
  // 실제 DOM 요소 → 루트 DOM 컨테이너
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();