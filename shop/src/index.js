import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

//  # BrowserRouter
//  # HashRouter : url에 #이 생성 & 더 안전한 라우팅이 가능
// ※ url의 # 기호는 서버로 넘어가지 않음

//  # redux 설정
import { Provider } from 'react-redux'; // 1. import 시키고
import { createStore } from 'redux';

let store = createStore(() => {
  return [{ id: 0, name: 'jacket', quan: 2 }]
});
// 2. Provider 태그로 App 감싸고
// 3. createStore() 안에 state 저장
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> 
        <App />
        </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
