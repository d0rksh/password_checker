import { useState } from 'react'
import './App.css'
import CardList from './components/CardList';
import React from 'react';
import { SERVER_URL, strongPasswordChecker } from './utils';

function App() {
  const [password,setpassword] = useState("");
  const [strong,setStrong] = useState(-1);
  const [feedback,setFeedback] = useState([])
  const [data,setData] = useState([]);
  React.useEffect(()=>{
      fetch(SERVER_URL).then(r=>r.json()).then(response=>{
           if(response.data){
              setData(response.data)
           }
      })

  },[])
  const changePasswords = (e)=>{
         setpassword(e.target.value);
  }
  const submit = ()=>{
    const [result,feedback] = strongPasswordChecker(password);
    fetch(SERVER_URL,{
      method:'POST',
      body: JSON.stringify({password: password,steps:result}),
      headers:{
        'content-type': 'application/json'
      }
    }).then(_=>{
        const modify = [...data];
        modify.push({password: password,steps:result});
        setData(modify)
    });
    setFeedback(feedback);
    setStrong(result);
  }

  return (
    <div className="container">
         <h1>🔒 Password Checker</h1>
         <input value={password} onChange={changePasswords}  placeholder='***enter your password***' className='input__box' type={'text'}/>
         <button onClick={submit} className='submit__btn'>Check</button>
         {
          strong != -1 ? <div className={strong > 0 ? 'result red__border':'result  green__border'} >
            <h1 className='result__title'>{strong > 0 ? '🚫 Weak password!':'✅ Strong Password'} </h1>
            <ul className='result__feedback'>
              <li >{strong} steps to create strong password</li>
              {feedback.map((e,i)=>{
                return <li key={i}>{e}</li>
              })}
            </ul>
         </div>:null
         }
         <CardList data={data}></CardList>
    </div>
  )
}

export default App
