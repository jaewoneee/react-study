// react 컴포넌트 만들때는 꼭 import React 해야함!
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

let box = styled.div`padding:20px;`;
let name = styled.h4`font-size:20px;font-weight:bold`;


function Detail(props) {
    let { id } = useParams();  //  useParams : 파라미터 가져와 object 형태로 담는 훅
    let history = useHistory(); // useHistory : 방문기록이 가져와 object 형태로 담는 훅
    let product = props.shoes.find((info) => {
        return info.id == id;
    })
    
    return (
        <div className="container">
            <box>
                <name>뭐야</name>
             </box>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{product.title}</h4>
                    <p>{product.content}</p>
                    <p>{product.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                    <button className="btn btn-danger" onClick={() => {
                        // 이전 페이지로 이동 시키기
                        history.goBack();
                        // 특정 경로로 이동 시키기 : history.push('/');
                     }}>뒤로가기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;