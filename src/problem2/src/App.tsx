import { useState } from 'react';
import s from './App.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <form onsubmit="return !1">
        <h5>Swap</h5>
        <label for="input-amount">Amount to send</label>
        <input id="input-amount" />

        <label for="output-amount">Amount to receive</label>
        <input id="output-amount" />

        <button>CONFIRM SWAP</button>
      </form>
    </>
  )
}

export default App
