import { useState } from 'react';
import './App.css';

// App.js : 메인페이지에 들어갈 HTML 짜는 곳
// react는 jsx 문법을 쓴다
// 태그에 class 주고 싶다면, className 으로!

// 태그에 인라인 스타일을 주려면 style={{object}} 형태로 넣어야 함
// css 상에서 하이픈 쓰는 속성명은 카멜 케이스로 변경해서 적용해야 함
// ex) font-size => fontSize

function App() {
  // # useState 
  // 1. state는 변수 대신 쓰는 데이터 저장공간
  // 2. useState는 [state 데이터, state 데이터 변경함수] 를 return 한다.
  // 3. state 데이터는 문자, 숫자, array, object 다 저장가능
  // 4. state를 바꾸려면 state 데이터 변경함수를 호출해서 사용!
  // * 데이터를 변수에 담는 대신 state를 담는 이유 
  // 변수가 변경되면 새로고침을 해야 재렌더링이 된다. BUT, state가 변경되면 HTML은 새로고침 없이자동으로 재렌더링 된다

  // # 아래의 변수는 es6의 destructuring 문법 활용한 것
  let [title, func] = useState(['송리단길 맛집', '이태원 맛집', '연남동 맛집']);
  let [num, addNum] = useState(0);
  let [modal, changeModal] = useState(false);
  let [index, getIndex ]= useState(0);

  function changeTitle() {
    // title[0] = '변경할 값' <- 이런 형태의 데이터 변경은 권장하지 않음(state를 직접 건드는 것이라서!)
    // 해결책 => deep copy : 값공유 X, 서로 독립적인 값을 가지는 복사
    // reference data type 검색해 보기
    var newArray = [...title];
    newArray[0] = '경리단길 맛집';
    func(newArray);
  }

  //*return 안에는 최상위 div 한개만 가능
  return (
    <div className="App">
      <div className="black-nav" style={{fontSize:'30px'}}>개발 Blog</div>
      <ul className="list">
             <li>
                <h3>{title[0]} <span onClick={()=>{addNum(num+1)}}>👍</span>{ num }</h3>
                <button onClick={changeTitle}>눌러</button>
                <p>12월 6일발행</p>
              </li>
           {
            title.map((value, index) => {
              return( <li>
                <h3 onClick={() => { getIndex(index); changeModal(true)}}>{value}, {index}</h3>
                <p>12월 6일발행</p>
              </li>)
            })
        }

      </ul>

      {
        modal === true
          ? <Modal getTitle={ title } fetchIndex={ index }></Modal>
          : null
      }
        
    </div>
  );
}

// # react의 component 생성하기!
// 1. 함수 만들어 이름짓고
// 2. 축약을 원하는 HTML넣고,
// 3. app 컴포넌트의 원하는 곳에서 함수명(컴포넌트명)을  태그 형태 or <함수명 /> <- 이 형태로 입력!

// # props로 자식에게 state 전해주는 법
// 1. <자식 컴포넌트 작명={state명}>
// 2. 자식 컴포넌트에서 props 파라미터 입력 후 사용
function Modal(props) {
  // return() 내부를 묶을 때, 의미없는 <div> 쓰기 싫으면
  // <></> <- fragments 문법
  return (
    <>
      <div className="modal">
        <h2>{ props.getTitle[props.fetchIndex] }</h2>
            <p>날짜</p>
            <p>상세내용</p>
      </div>
    </>
      )
}

// react의 if문은 삼항연산자로
// 반복문은 map 함수로.
// 그래도 for 반복문을 쓰고 싶다면 일반 함수 안에서 사용한다




export default App;
