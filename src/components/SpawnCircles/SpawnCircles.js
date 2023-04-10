import React, { useState, useEffect } from 'react'

const SpawnCircles = () => {
  const [circles, setCircles] = useState([])
  const [removedCircles, setRemovedCircles] = useState([])
  const [radius, setRadius] = useState(3)
  const [delay, setDelay] = useState(false)

  const handleClick = (event) => {
    if(delay) return
    if(radius === 0) return

    setDelay(true)

    setTimeout(() => {
        setDelay(false)
    }, 200);

    const { pageX, pageY } = event

    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    setCircles(circles => [...circles, [ pageX, pageY, randomColor, radius ]]);
    console.log(circles)
  };

  const handleUndo = () => {
    if(circles.length === 0) return

    setRemovedCircles([...removedCircles, circles[circles.length - 1]])
    setCircles(circles.slice(0, -1))
  }

  const handleRedo = () => {
    if(removedCircles.length === 0) return

    const lastCircle = removedCircles[removedCircles.length - 1]

    setRemovedCircles(removedCircles.slice(0, -1))
    setCircles([...circles, lastCircle])
    
  }

  const getBackground = (elem) => {
    return elem.length > 0 ? `#${elem[elem.length - 1][2]}` : '#fff'
  }

const handleOnWheel = (e) => {
  if(e.nativeEvent.wheelDelta > 0) setRadius(radius + 1)
  else setRadius(radius - 1)
}

  
useEffect(() => {
    console.log(delay)
}, [delay])


  return (
    <div className="container" >
      <button className='btn' style={{ background: getBackground(circles) }} onClick={handleUndo}>Undo</button>
      <button className='btn' style={{ background: getBackground(removedCircles) }} onClick={handleRedo}>Redo</button>
      
      <div className='canvas' onClick={handleClick} onWheel = {handleOnWheel}>
        {circles.map((circle, index) => (
          <div className="circle" key={index} style={{ left: circle[0], top: circle[1], background: `#${circle[2]}`, height: `${circle[3]}rem`, width: `${circle[3]}rem` }}></div>
        ))}
      </div>
    </div>
  );
}

export default SpawnCircles
