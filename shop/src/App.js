/* eslint-disable */
import { useState } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import './App.css';
import shoesData from './data';
import Detail from './detail'

import { Link, Route, Switch } from 'react-router-dom';

function App() {
  let [shoes, changeShoes] = useState(shoesData);

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
          <div className="row">
            {
              shoes.map((shoe, index) => {
                return (
                  <Card getShoes={shoes[index]}></Card>
                )
              })
            }
          </div>
        </div>
      </Route>
      <Route path="/detail/:id">
          <Detail shoes={ shoes }></Detail>
      </Route>
      {/* <Route path="" component={ aaa }></Route> */}
      <Route path="/:id">
            <div>whatever</div>
      </Route>       
    </Switch>
    </div>
  );
}

// component화
function Card(props) {
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.getShoes.id}.jpg`} width="100%" alt="thumbnail" />
      <h4>{props.getShoes.title}</h4>
      <small>{props.getShoes.content}</small>
      <p>{props.getShoes.price} won</p>
    </div>
  )
}

// # Route
// 더 정확한 라우트 분리를 위해선 exact 속성을 넣어줘야 한다.

// # Switch
// path가 중복 매칭되는 경우, 먼저 정의된 path의 내용 하나만 보여 준다

export default App;
