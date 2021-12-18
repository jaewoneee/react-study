import { useEffect, useState, memo } from "react";

function Play() {
    
    let [count, setCount] = useState(0);
    let [age, setAge] = useState(29);

    useEffect(() => {
        if (!count === 0) {
            setTimeout(()=>{setAge(age + 1);}, 1000)
        }
    }, [count]);

    return (
        <div>
            <div> i am {age}</div>
            <div>{ count }</div>
            <button onClick={() => {
                if (count < 3) {
                    setCount(count + 1);
                } else {
                    alert('stop');
                }
                
            }}>getOlder</button>
            <Person name='jay' age='29'></Person>
        </div>
    )
}

//  # memo : 쓸데없는 재렌더링을 막아준다. => 특정 데이터가 변경될 때만 랜더링 시켜준다
// memo로 감싼 함수를 변수에 할당해서 사용하면 된다.
function Person(props) {
    return (
        <>
            <Name name={props.name}></Name>
            <Age age={ props.age }></Age>
        </>
    )
}
function Name(props) {
    console.log('rendered1');
    return (
        <p>제 이름은 {props.name}</p>
    )
}
let Age = memo(function(props) {
    console.log('rendered2');
    return (
        <p>제 나이는 { props.age }</p>
    )
})

export default Play;