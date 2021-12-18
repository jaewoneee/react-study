// react 컴포넌트 만들때는 꼭 import React 해야함!
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
import { stockContext } from './App.js';
import './Detail.scss';
import { connect } from 'react-redux';

// # Lifecycle Hook
//  1. 옛날 버전
// class hookExample extends React.Component{
//     componentDidMount() {
//     // hookExample 컴포넌트가 마운트 되면 실행할 코드 : 비동기 통신 내용 많이 씀
//     }
//     componentWillUnmount() {
//     // hookExample 컴포넌트가 언마운트 되기 직전에 실행할 코드
//     }
// }

function Detail(props) {
    let { id } = useParams();  //  useParams : 파라미터 가져와 object 형태로 담는 훅
    let history = useHistory(); // useHistory : 방문기록이 가져와 object 형태로 담는 훅
    let product = props.shoes.find((info) => {
        return info.id == id;
    })
    let [tab, changeTab] = useState(0);
    let [transition, changeTransition] = useState(false);
    let [modal, changeModal] = useState(true);
    let [quantity, changeQuantity] = useState(0);
    let [value, changeValue] = useState('');
    let productStock = useContext(stockContext);

    // localStorage 저장하기
    // *** 내 코드
    // useEffect(() => {
    //     let storage = localStorage.getItem('watched');
      
    //     if (storage !== null) {
    //         storage = JSON.parse(storage);
    //     } else {
    //         storage = []
    //     }
    //     storage.push(id);
    //     storage = Array.from(new Set(storage));    // new Set() : 중복 데이터 제거
    //     localStorage.setItem('watched', JSON.stringify(storage));
    // }, []);

    // *** 선생님 코드
    useEffect(() => {
        var arr = localStorage.getItem('watched');
        if (arr == null) {
            arr = []
        } else {
            arr = JSON.parse(arr);
        }
        arr.push(id);
        arr = new Set(arr);
        arr = [...arr];
        localStorage.setItem('watched', JSON.stringify(arr));
    })

    //  2. 요즘 버전 : useEffect
    //  1)컴포넌트가 mount 되었을때 / 2)컴포넌트가 update(재렌더링) 되었을 때 / 3)컴포넌트가 사라질 때(=unmount) 실행 시킬 수 있다
    // *** [] 대괄호안에 state를 집어넣으면 state가 변경되면 이 코드 실행해주세요~ 라는 뜻으로도 사용가능
    // useEffect는 여러 번 쓸 수 있다! 근데, 작성한 순서대로 실행된다.
    useEffect(() => {

        // ※setTimeout 기능은 변수에 넣어 사용하는 케이스가 많다. 어떤 곳에서는 이 기능을 쓰고 싶지 않을 수도 있으니깐~
        let timer = setTimeout(() => {
            changeModal(false);
        }, 3000);

        // 3)의 경우, 실행할 코드 앞에 return 을 써줘야 함
        return () => {
            clearTimeout(timer);
        }
        // useEffect는 [조건]을 넣을 수 있다. => [modal] state 가 변경이 될 때만 setTimeout 실행하라는 뜻임.
        // [] 이 안에 조건은 여러개 들어갈 수 있다.
        // [] <- 공란이라면? 컴포넌트 마운트 됐을 때 한번 실행하고 그 이후는 실행이 안됨.
    }, [modal]);


    return (
        <div className="container">
            <input placeholder='what' onChange={(e) => { changeValue(e.target.value) }}></input>
            <p>{value}</p>
            {
                modal === true
                    ? (<div className="alert-box">
                        <div className='my-alert'>
                            <p>재고가 얼마 남지 않았습니다</p>
                        </div>
                        <div className='my-alert2'>
                            <p>재고가 얼마 남지 않았습니다!</p>
                        </div>
                        <div className='my-alert3'>
                            <p>듸용</p>
                        </div>
                    </div>)
                    : null
            }

            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${product.id}.jpg`} width="100%" alt="thumb" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{product.title}</h4>
                    <p>{product.content}</p>
                    <p>{product.price}</p>
                    <input placeholder='구매수량' onChange={(e) => { changeQuantity(e.target.value) }}></input>
                    <p>재고 : {productStock[product.id - 1]}</p>
                    {/* <Info getStock={ props.stock }></Info> */}
                    <button className="btn btn-danger" onClick={() => {
                        props.changeStock([9, 10, 11]);
                        props.dispatch({ type: 'addItem', payload: { id: product.id, name: product.title, quan: quantity } });
                        history.push('/cart');
                    }}>주문하기</button>
                    <button className="btn btn-danger" onClick={() => {
                        // 1. 이전 페이지로 이동 시키기
                        history.goBack();
                        // 2. 특정 경로로 이동 시키기 : history.push('/');
                    }}>뒤로가기</button>
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={() => { changeTab(0); changeTransition(false); }}>1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => { changeTab(1); changeTransition(false); }}>2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => { changeTab(2); changeTransition(false); }}>3</Nav.Link>
                </Nav.Item>
            </Nav>
            <CSSTransition in={transition} classNames="wow" timeout={500}>
                <TabContent currentTab={tab} tabAni={changeTransition}></TabContent>
            </CSSTransition>
        </div>
    )
}
function TabContent(props) {
    useEffect(() => {
        props.tabAni(true);
    })
    if (props.currentTab === 0) {
        return <div>0번째</div>
    } else if (props.currentTab === 1) {
        return <div>1번째</div>
    } else {
        return <div>2번째</div>
    }
}

// redux store 데이터를 가져와 props로 변환해 주는 함수
function fetchStore(state) { // state는 store에 있던 모든 데이터
    return {
        state: state.reducer
    }
}
export default connect(fetchStore)(Detail);