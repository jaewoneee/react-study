import { useEffect, useState } from "react";

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
        </div>
    )
}

export default Play;