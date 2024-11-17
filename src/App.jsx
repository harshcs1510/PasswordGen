import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed]=useState(false)
  const [charAllowed, setCharAllowed]=useState(false)
  const [password, setPassword]=useState("")

  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*-_"

    for (let i=1;i<=length;i++) {
      pass+=str[Math.floor(Math.random()*str.length+1)]
    }

    setPassword(pass)

  }, [length,numAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=> {passwordGenerator()}, [length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='container'> Password Generator
        <div className='container-two'>
          <input type="text" value={password} className='input' placeholder='password' readOnly ref={passwordRef} />
          <button className='button' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='container-three'>
          <div className='container-four'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='container-four'>
            <input type="checkbox" defaultChecked={numAllowed} id="numberInput" 
            onChange={()=>{
              setNumAllowed((prev)=>!prev);
            }}/>
            <label>Numbers</label>

            <input type="checkbox" defaultChecked={charAllowed} id="charInput" 
            onChange={()=>{
              setCharAllowed((prev)=>!prev);
            }}/>
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
