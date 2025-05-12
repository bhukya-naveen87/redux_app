import React from 'react'
import Counter from './components/Counter'
import IncreaseButton from './components/IncreaseButton'
import DecreaseButton from './components/DecreaseButton'

const App = () => {
  return (
    <div className='main'>
      <DecreaseButton />
      <Counter />
      <IncreaseButton />
    </div>
  )
}

export default App