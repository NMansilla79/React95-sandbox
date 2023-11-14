import { useEffect, useState, useContext } from 'react';
import { mousePositionContext, openedWindows } from '../../App'

import '../../App.css';

/* const iconWidth = 80
const iconHeight = 100 */

function Task({props}){
  return(<>
      <button>
        {props.title} {props.id}
      </button>
  </>)
}

function Toolbar(){
  let date = new Date()

  // eslint-disable-next-line no-unused-vars
  const [mouseCoords,dimensions] = useContext(mousePositionContext);
  const [windows] = useContext(openedWindows)

  const [clock,setClock] = useState({day: date.toLocaleDateString(), time: date.toLocaleTimeString()})
  
  useEffect(()=>{    
    setInterval(()=>{
      let date = new Date()      
      setClock(
        {day: date.toLocaleDateString(), time: date.toLocaleTimeString()}
      )
    }
    ,1000)
  },[])

  return(
  <footer className="Toolbar">
    
    <div style={{
      display: 'flex'
    }}>
      <button>
        React95
      {/*   <div>
          <span>{dimensions.width} {dimensions.height} || { Math.floor(dimensions.width / iconWidth) } {Math.floor(dimensions.height / iconHeight) }</span>
        </div>
        <span>{mouseCoords.x} {mouseCoords.y} || {Math.floor(mouseCoords.x / iconWidth)} {Math.floor(mouseCoords.y / iconHeight)}</span> */}
      </button>

      {windows?.length > 0 && 
        windows.map(window =>(
          <Task key={windows.indexOf(window)} props={window}/>
        ))
      }
      
    </div>
    
    <div className='Clock'>
      <div>
        {clock.day}
      </div>
      <div>
        {clock.time}
      </div>
    </div>
  </footer>)
}

export default Toolbar