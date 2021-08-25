import React,{useRef, useState} from 'react'
//import styles
import './Input.css'


import Children from './children'




//export component
export default ({min,max,emit,errorEmit,type,placeholder})=>{
    //states
    const [state,setState] = useState('')
    const [styles,setStyles] = useState('noError')
    const [error,setError] = useState(null)

    const [child ,setChild]= useState([])

    //function check
    const check = (e) => {
        if(state.length <= min ){
            setError(`поле ${placeholder} меньше ${min} символов`)
            setStyles("hasError")
            errorEmit(null)
        }
        else if(state.length >= max){
            setError(`поле ${placeholder} больше ${max} символов`)
            setStyles("hasError")
            errorEmit(null)
        }
        else{
            setStyles("noError")
            setError(null)
            emit(state)
        }
        setState(e.target.value)
       
    }




    const add = () =>{
       setChild([...child,1])
    }



    //template
    return (
        <div className="input-container">
            <div className="container">
                <input className={styles} onChange={check} type={type || 'text'} placeholder={placeholder} />
                <div onClick={add} className="btn">add</div>
            </div>
            { error && (<div>{error}</div>)}

           <div className="child">
              {Object.values(child).map(i=>{
                return <Children key={i} 
                placeholder={placeholder}
                emit={data=>emit(data)}
                min={min} 
                max={max} 
                type={type}
                errorEmit={error=>errorEmit(error)}
                />  
              })}
            </div>
        </div>
    )
}