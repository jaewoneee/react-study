import { useState } from 'react';
import './App.css';


function App() {
  let [title, changeTitle] = useState(['가', '나', '다']);
  let [index, changeIndex] = useState(0);
  let [likes, changeLikes] = useState([0, 1, 0]);
  let [modal, changeModal] = useState(false);

  function addLikes(index) {
    var temp = [...likes];
    temp[index] = temp[index] + 1;
    changeLikes(temp);
  }
  
  return (
    <div className="App">
      <div className="black-nav" style={{fontSize:'30px'}}>개발 Blog</div>
      <ul className="list">
        {
          title.map((title, index) => {
            return (
              <li onClick={() => { changeModal(true); changeIndex(index);}}>
                <h3>{title}<span onClick={()=>{ addLikes(index)}}>👍</span>{ likes[index] }</h3>
                <p>12월 6일발행</p>
              </li>
            )
          })
        }
      </ul>
        {
          modal === true
            ? <Modal fetchTitle={title} fetchIndex={ index }></Modal>
            : null
        }
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h2>{ props.fetchTitle[props.fetchIndex] }</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
    )
}


export default App;
