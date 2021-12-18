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
import { combineReducers, createStore } from 'redux';

let defaultState = [  // 기본 데이터
  { id: 0, name: 'jacket', quan: 2 },
  { id: 1, name: 'pants', quan: 5 }
];
let alertState = true;


// # reducer : store 데이터 수정 위한 코드를 담는 곳
// reducer는 항상 state를 return 해야 한다!
function reducer(state = defaultState, action) {  // <= es6의 default parameter 라는 문법임. 들어오는 인수가 없을 시 사용한 기본 값을 설정하는 거다. 
  let newState = [...state];
  if (action.type === 'addItem') {
    let $item = state.findIndex((a) => { return a.id === action.payload.id });
    if ($item > 0) {
      newState[$item].quan = Number(newState[$item].quan) + Number(action.payload.quan);
    } else {
      newState.push(action.payload);  
    }
    return newState; 
  }else if (action.type === 'increment') { 
    newState[action.payload].quan++;
    return newState;
  } else if(action.type === 'decrement'){
    newState[action.payload].quan--;
    return newState;
  } else {
    return state
  }
}

function alertReducer(state = alertState, action) {
  if (action.type === 'close') {
    return state = false;
  } else {
    return state;
  }
}
// combineReducers : 리듀서 여러개 묶어서 넣어주기!
let store = createStore(combineReducers({ reducer, alertReducer }));

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
