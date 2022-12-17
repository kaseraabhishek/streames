import React, {useEffect, useRef, useState} from "react"
const CountUp = ({start, end}) => {
    const [state, setState] = useState(start);
    const ref = useRef(start);
    const accumulator = end/100;

    const updateCounterState = () => {
        if(ref.current < end) {
            const result = Math.ceil(ref.current + accumulator)
            if(result>end) return setState(end)
            setState(result);
            ref.current = result
        }
        setTimeout(updateCounterState, 10)
    };
    useEffect(()=> {
        let isMounted = true
        if(isMounted) {
            updateCounterState()
        }
        return () => isMounted=false;
    }, [end])

    return <span>{state}</span>
}
export default CountUp