import React,{useState} from 'react'
import ControlInput from './ControlInput'
export default ()=>{

    //all states
    const [name,setName] = useState()
    const [company,setCompany] = useState()
    const [telegram,setTelegram] = useState()
    const [description,setDescription] = useState()

    const [mainError,SetError] = useState()


    //handle submit
    const handle =  (e) => {
        e.preventDefault()

        //request options
        const headers =  {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name,company,description,telegram })
        };


        //check all state if al  states is true then make request to some domain
        if(name && company && telegram && description){
            fetch(' https://domain.com/spa/sunrise',headers).then(data=>{
               alert('отправлено')
                console.log(data);
            })
            //if occurred some error
            .catch(error=>{
                //log some error
               alert('оишибка  в запросе')
                console.log(error);
            })
        }

        //if some or all form filled incorrect
        else{
            SetError(`некоторые поля заполнены не корректно!`)
        }
    }

    return (
        <form onSubmit={handle} style={{display:'flex',flexDirection:"column",gap:50  }}>
            <ControlInput 
                emit={data=>setName(data)}
                placeholder={'name'}
                min={3} 
                max={12} 
                type={'text'}
                errorEmit={error=>setName(error)}
              />
            <ControlInput
                placeholder={'company name'}
                emit={data=>setCompany(data)}
                min={5} 
                max={20} 
                type={'text'}
                errorEmit={error=>setCompany(error)}
             />
            <ControlInput 
                placeholder={'telegram'}
                emit={data=>setTelegram(data)}
                min={4} 
                max={50} 
                type={'text'}
                errorEmit={error=>setTelegram(error)}
            />
            <ControlInput
                placeholder={'description'}
                emit={data=>setDescription(data)}
                min={20 } 
                max={2000} 
                type={'text'}
                errorEmit={error=>setDescription(error)}
             
             />
             {mainError && <div style={{fontSize:20,color:'#EB5757',textAlign:'center'}}>{mainError}</div>}
            <button style={{width:'100%',height:32,borderRadius:10,border:'none'}} type="submit">send</button>
        </form>
    )
}