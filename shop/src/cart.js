import React from 'react';
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux';

function Cart(props) {
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
                        props.state.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quan}</td>
                                    <td>
                                        <button onClick={() => { props.dispatch({ type: 'increment', payload: i }) }}>+</button>
                                        <button onClick={() => { props.dispatch({ type: 'decrement', payload: i }) }}>-</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        props.alert === true
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

// redux store 데이터를 가져와 props로 변환해 주는 함수
function cartStore(state) { // state는 store에 있던 모든 데이터
    return {
        state: state.reducer,
        alert: state.alertReducer
    }
}
export default connect(cartStore)(Cart);
// export default Cart;