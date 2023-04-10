import React, { useState, useEffect } from 'react'

import './SortRegisterQueue.css'

const SortRegisterQueue = () => {
    const [registers, setRegisters] = useState([0, 0, 0, 0, 0])
    const [lines, setLines] = useState([[1, 5], [3, 1], [4], [7], [2, 3]])
    const [productNum, setProductNum] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    const intervalIDRef = React.useRef(null);
    
    const calcTotals = () => {
      const totals = [...registers]
  
      lines.forEach((elem, index) => {
        totals[index] = (elem.reduce((acc, curr) => acc + curr, 0))
      })
  
      return totals
    }

    const decrementQueue = () => {
      const newLines = [...lines]

      for (let i = 0; i < newLines.length; i++) {
        if(newLines[i][0] > 1)
          newLines[i][0]--
        else 
          newLines[i].shift()
      }
      setLines(newLines)
    }

    const decrementRegisters = () => {
      const newRegs = registers

      for(let i = 0; i < newRegs.length; i++)
        {
          if(newRegs[i] === 0) newRegs[i] = 0
          else newRegs[i]--;
        }  
      
        setRegisters(newRegs)
    }
  
    const addToQueue = () => {

      if(productNum === 0) return
  
      const newArr = [...lines]
      
      newArr[registers.indexOf(Math.min(...registers))].push(parseInt(productNum))
  
      setLines(newArr)

      setRegisters(calcTotals)
    }

    const handleStart = () => {
      if(isRunning) return

      setIsRunning(true)
        
      intervalIDRef.current = setInterval(() => {
          console.log(registers)
          console.log(lines)
          
          decrementRegisters()
          decrementQueue()

          console.log('-------------------------')
        }, 1000)
        
    }

    const stop = () => {
      clearInterval(intervalIDRef.current)
      setIsRunning(false)

    }

    const displayView = () => {
      return(
        <>
          <div className='checkout'>
            <input type='number' onChange={(e) => setProductNum(e.target.value)} value={productNum} />
            <button onClick={addToQueue}>checkout</button>
            <button onClick={handleStart}>go</button>
            <button onClick={stop}>stop</button>
          </div>
          <div className='registers'>
            {registers.map((register, index) => (
              <div key={index} className='register'>
                {register}
              </div>
            ))}
          </div>
          <div className='lines'>
            {lines.map((line, index) => {
              if(line.length > 0) {
                return (<div key={index} className='line'>
                  {line.map((customer, index) => (
                    <div key={index} className='customer'> 
                      {customer}
                    </div>
                  ))}
                </div>)
              } else {
                return (
                  <div key={index} className='line'>
                  </div>
                )
              }})}
          </div>
        </>)
    }

    useEffect(() => {
      setRegisters(calcTotals)
    }, [])
  
    
    return (
        <div className='content'>
            {displayView()}
        </div>
    )
    
}

export default SortRegisterQueue