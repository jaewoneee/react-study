/* eslint-disable */
import React, { useState, useContext, lazy, Suspense, useEffect} from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import shoesData from './data';
// import Detail from './detail'
// lazy 쓴 이유 : detail컴포넌트(detail.js) 가 필요할 때에만 불러오기 위해 
let Detail = lazy(() => { return import('./detail.js') });
import Cart from './cart'
import Play from './play'
// # context
// 1. React.createContext로 범위 생성 => 변수에 담음!
// 2. 같은 값을 공유할 HTML을 변수명의 태그로 감싼다. ex) <stockContext.Provider>
// 3. 태그 안의 value 속성에 공유하고 싶은 데이터를 지정한다 ex) value={stock}
export let stockContext = React.createContext();

function App() {
  let [shoes, changeShoes] = useState(shoesData);
  let [stock, changeStock] = useState([1,2,3])
  let [status, changeStatus] = useState(false);
  let [idx, changeIdx] = useState(2);


  

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><Link to="/">shop</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={ Link } to="/">Home</Nav.Link>
              <Nav.Link as={ Link } to="/detail/1">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="visual-wrap">
        <div className="text-box">
          <h2>20% Sales Off</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <Switch>
      <Route exact path="/">
        <div>메인</div>
          <div className="container">
          <stockContext.Provider value={stock}>
          <div className="row">
            {
              shoes.map((shoe, index) => {
                return (
                  <Card getShoes={shoes[index]}></Card>
                )
              })
            }
              </div>
           </stockContext.Provider>
            {
              status == true
                ? <Load></Load>
                : null
            }

            <button className='btn btn-primary' onClick={() => {
              changeStatus(true);
              axios.get(`https://codingapple1.github.io/shop/data${idx}.json`)
                .then((result) => {
                  changeStatus(false);
                  changeShoes([...shoes, ...result.data]);
                  changeIdx(idx + 1);
                })
                .catch((err) => {
                  console.log(err);
                })
            }}>더보기</button>
      
        </div> 
      </Route>
        <Route path="/detail/:id">
          <stockContext.Provider value={stock}>
            {/* lazy 쓰면 Suspense 같이 써줘야함 . fallback은 로딩 중에 보여줄 엘리먼트*/}
            <Suspense fallback={ <div>Loading...</div>}>
            {/* props 데이터 보내는 것임 : shoes={shoes} */}
            <Detail shoes={shoes} changeStock={changeStock}></Detail>
            </Suspense>
          </stockContext.Provider>
      </Route>
        {/* <Route path="" component={ aaa }></Route> */}
       <Route path="/cart">
            <Cart></Cart>
        </Route>  
        <Route path="/play">
            <Play></Play>
        </Route>   
      <Route path="/:id">
            <div>whatever</div>
        </Route>   
       
    </Switch>
    </div>
  );
}

// component화
function Card(props) {
  let history = useHistory();
  return (
    <div className="col-md-4" onClick={()=>{history.push(`/detail/${props.getShoes.id}`)}}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.getShoes.id}.jpg`} width="100%" alt="thumbnail" />
      <h4>{props.getShoes.title}</h4>
      <small>{props.getShoes.content}</small>
      <p>{props.getShoes.price} won</p>
      <Test></Test>
    </div>
  )
}
function Load() {
  return (
    <p>loading...</p>
  )      
}

function Test() {
  // 4. context 로 생성된 데이터 갖다 쓰기 =>  useContext(범위명)
  let stocks = useContext(stockContext);
  return (
    <p>재고: { stocks[0] }</p>
  )  
}

// # Route
// 더 정확한 라우트 분리를 위해선 exact 속성을 넣어줘야 한다.

// # Switch
// path가 중복 매칭되는 경우, 먼저 정의된 path의 내용 하나만 보여 준다

export default App;
