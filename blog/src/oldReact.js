import React from 'react';

// state를 건드리든, function을 호출하든 꼭 앞에 this 를 붙여야 함.

class Profile extends React.Component{
    constructor() {
        super();
        this.state = { name:'Kim', age:30}
    }

    // this 바인딩을 위해 arrow function 씀
    changeName = () => {
        // setState는 useState와 달리 특정 state를 꼽아 변경할 수 있었다 
         this.setState({ name:'Park'})
    }
    
render(){
    return (
        <div>
            <p>{this.state.name}</p>
            <button onClick={ this.changeName }>버튼</button>
        </div>
    )
    }
}

export default Profile;