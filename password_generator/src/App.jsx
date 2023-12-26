import { useCallback, useEffect, useRef, useState } from 'react';

import './App.css';

function App() {
  const [state, setState] = useState({
    length: '8',
    numberAllowed: false,
    charAllowed: false,
    password: '',
    
  })
  const passwordref = useRef(null)

  const copyClipBoard = () =>{
    window.navigator.clipboard.writeText(state.password);
    passwordref.current.select()
  }
  const generatePassword = useCallback(()=>{
      let pass = ''
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      if (state.numberAllowed) str+='0123456789';
      if (state.charAllowed) str+='!@#$%^&*()-=_+[]{}|;:,.<>?';
       
      for(let i=0;i<state.length;i++){
        const char = Math.floor(Math.random()* str.length);
        pass+=str.charAt(char)
      }
      setState((pre)=>({
        ...pre,
        password:pass
      }))
  },[state.length,state.numberAllowed,state.charAllowed])

  console.log(`${state.length}`);
  

  useEffect(()=>{
    generatePassword()
  },[state.length,state.numberAllowed,state.charAllowed])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          className='outline-none w-full py-1 px-3 '
          value={state.password}
          onChange={(e)=>setState((pre)=>({
            ...pre,
            password:e.target.value
          }))}
          placeholder='Password'
          ref={passwordref}
        />
        <button onClick={copyClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          copy
        </button>
      </div>
      <div className='flex gap-2 text-sm'>
      <div className='flex gap-x-2 items-center'>
        <input
          type="range"
          min={6}
          max={100}
          value={state.length}
          name=""
          id=""
          className='cursor-pointer'
          onChange={(e)=>setState((pervious)=>({
            ...pervious,
            length:e.target.value
          }))} // Provide a function for onChange
        />
        <label htmlFor="passwordLength">Length: {state.length}</label>
      </div>
      <div className='flex gap-x-2 items-center'>

        <input type="checkbox" defaultChecked={state.numberAllowed}
        onChange={()=>{
          setState((pre)=>(
            {
              ...pre,
              numberAllowed:!pre.numberAllowed
            }
          ))
        }}/>
        <label>Number</label>
        <input type="checkbox" defaultChecked={state.charAllowed}
        onChange={()=>{
          setState((pre)=>(
            {
              ...pre,
              charAllowed:!pre.charAllowed
            }
          ))
        }}/>
        <label>Charactor</label>
      </div>
      </div>
     
    </div>
  )
}

export default App;
