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
                    <tr>
                        <td>{props.state[0].id}</td>
                        <td>{props.state[0].name}</td>
                        <td>{props.state[0].quan}</td>
                        <td>@mdo</td>
                    </tr>
                    
                </tbody>
            </Table>
        </>
    )

}

// redux store 데이터를 가져와 props로 변환해 주는 함수
function cartStore(state) {
    return {
        state : state
    }
}
export default connect(cartStore)(Cart);
// export default Cart;