// react 컴포넌트 만들때는 꼭 import React 해야함!
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {stockContext} from './App.js';
import './Detail.scss';

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
    let [modal, changeModal] = useState(true);
    let [value, changeValue] = useState('');
    //  2. 요즘 버전 : useEffect
    //  1)컴포넌트가 mount 되었을때 / 2)컴포넌트가 update(재렌더링) 되었을 때 / 3)컴포넌트가 사라질 때(=unmount) 실행 시킬 수 있다
    // useEffect는 여러 번 쓸 수 있다! 근데, 작성한 순서대로 실행된다.

    let productStock = useContext(stockContext);

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
            <p>{ value }</p>
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
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{product.title}</h4>
                    <p>{product.content}</p>
                    <p>{product.price}</p>
                    <p>재고 : { productStock[product.id - 1] }</p>
                    {/* <Info getStock={ props.stock }></Info> */}
                    <button className="btn btn-danger" onClick={() => {
                        props.changeStock([9, 10, 11]);
                    }}>주문하기</button>
                    <button className="btn btn-danger" onClick={() => {
                        // 1. 이전 페이지로 이동 시키기
                        history.goBack();
                        // 2. 특정 경로로 이동 시키기 : history.push('/');
                    }}>뒤로가기</button>
                </div>
            </div>
        </div>
    )
}

// function Info() {
//     return (
//         <p>재고 : { productStock }</p>
//     )
// }
export default Detail;