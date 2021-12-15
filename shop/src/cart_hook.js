import React from 'react';
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

function Cart(props) {
    // state 꺼내 쓰는 방법 2
    // # useSelector : store 데이터 가져오는 hook
    let state = useSelector((state)=>state);
    
    //  # useDispatch : dispatch 가져와 쓰는 hook
    let dispatch = useDispatch();
    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.reducer.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quan}</td>
                                    <td>
                                        <button onClick={() => { dispatch({ type: 'increment', payload: i }) }}>+</button>
                                        <button onClick={() => { dispatch({ type: 'decrement', payload: i }) }}>-</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        state.alertReducer === true
                            ? <div className="alert-box">
                                <div className='my-alert'>
                                    <p>지금 구매하시면 할인 20%</p>
                                    <button onClick={() => { props.dispatch({ type: 'close' }) }}>닫기</button>
                                </div>
                            </div>
                            : null
                    }

                </tbody>
            </Table>
        </>
    )

}

export default Cart;