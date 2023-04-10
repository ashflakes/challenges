import React, { useState } from 'react'

import './EntryInBetween.css'

const EntryInBetween = () => {
    const [cells, setCells] = useState(['1'])
    const [num, setNum] = useState(2)
  
    const handleClick = (index) => {
  
      const newCells = [...cells]
  
      newCells.splice(index, 0, num)
      
      setCells(newCells)
      setNum(num + 1)
  
      display()
    }
  
    const display = () => {
      const view = cells.map((cell, index) => (
        <div key={index} className='macro-cell'>
          <div  onClick={() => handleClick(index)}className='cell pre'>
          </div>
          <div className='cell'>
            {cell}
          </div>
        </div>))
    return view
  }
  
  
    return (
      <div className='App'>
        {display()}
        <div onClick={() => handleClick(cells.length)} className='cell pre'>
        </div>
      </div>
    );
}

export default EntryInBetween