
import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  let [length, setLength]= useState(8)
  let [numberAllowed, setNumberAllowed]= useState(false)
  let [charAllowed, setCharAllowed]= useState(false)
  let [password, setPassword]= useState("")
  // useRef
  let passwordRef = useRef(null)
  let passwordGenerator= useCallback(()=>{
        let pass = ""
        let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(numberAllowed) str+="0123456789"
        if(charAllowed) str+="~!@#$%^&*()?><"
        for(let i=1;i<=length;i++){
          let char = Math.floor(Math.random() * str.length+1)
          pass+=str.charAt(char);
        }
        setPassword(pass)
      }, [length, numberAllowed, charAllowed, setPassword])

      useEffect(()=>{
          passwordGenerator()
      }, [length, numberAllowed, charAllowed, passwordGenerator ])

      let copyPasswordToClipBoard = useCallback(()=>{
          window.navigator.clipboard.writeText(password)
      }, [password])

  return(
    <div className='box'>
      <h1 className='heading'>Password Generator</h1>
      <div className='box2'>
    <input type="text" value={password} className='password' placeholder='PASSWORD' readOnly ref={passwordRef}/>
    <button className='copy' onClick={copyPasswordToClipBoard}>COPY</button>
      </div>
      <div className='length'>
    <input type="range" id='range' min={6} max={100} value={length} onChange={(e)=>(setLength(e.target.value))}/>
    <label className='length'>Length : {length} </label><br></br>
    <div className='depend'>
  <input type="checkbox" defaultChecked={numberAllowed} onChange={()=> setNumberAllowed((prev)=> !prev)}/>
   <label>Numbers</label><br></br>
  <input type="checkbox" defaultChecked={charAllowed}   onChange={()=>   setCharAllowed((prev)=> !prev)}/>
   <label>Character</label>
    </div>
    
      </div>
    </div>
  )

}

export default App
