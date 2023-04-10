import React, { useState, useEffect } from 'react'

const SpawnCircles = () => {
  const [circles, setCircles] = useState([])
  const [removedCircles, setRemovedCircles] = useState([])
  const [delay, setDelay] = useState(false)
  //const [time, setTime] = useState(0)

  const handleClick = (event) => {
    if(delay) return
    setDelay(true)

    setInterval(() => {
        setDelay(false)
    }, 200);

    const { pageX, pageY } = event

    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    setCircles(circles => [...circles, { x: pageX, y: pageY, background: randomColor }]);
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
    return elem.length > 0 ? `#${elem[elem.length - 1].background}` : '#fff'
  }

//   React.useEffect(() => {
//     let interval = null;
  
//     interval = setInterval(() => {
//         setTime((time) => time + 1);
//       }, 100);
//     }, []);
  

  return (
    <div className="container" >
      <button className='btn' style={{ background: getBackground(circles) }} onClick={handleUndo}>Undo</button>
      <button className='btn' style={{ background: getBackground(removedCircles) }} onClick={handleRedo}>Redo</button>
      
      <div className='canvas' onClick={handleClick}>
        {circles.map((circle, index) => (
          <div className="circle" key={index} style={{ left: circle.x, top: circle.y, background: `#${circle.background}` }}></div>
        ))}
      </div>
    </div>
  );
}

export default SpawnCircles
