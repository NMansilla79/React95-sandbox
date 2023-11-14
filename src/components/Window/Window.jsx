import { useEffect, useState, useContext } from 'react';
import { mousePositionContext } from '../../App'

import '../../App.css';

import HandleLongClick from '../HandleLongClick'

function Window({program,minimize = ()=>{},extend = ()=>{},close = ()=>{}}){
    const [mouseCoords,dimensions] = useContext(mousePositionContext);
    const [windowPosition,setWindowPosition] = useState({x: -1000, y: -1000})
    
    function adjustPosition(dimensions){
      const elem = document.getElementById(program.id)
      const width = dimensions.width / 2 - elem.style.width 
      const height = dimensions.height / 2 - elem.style.height
      setWindowPosition({x: width, y: height})
    }
  
    useEffect(()=>{
      adjustPosition(dimensions)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
    return (
    <div id={program.id} className='Window' style={{top: windowPosition.y + "px", left: windowPosition.x + "px"}}>
      <div className='Header'>
        <div className='DragBox' {...HandleLongClick(()=>{setWindowPosition(mouseCoords)})}>
          <b>
            {program.title + program.extension} {program.id}
          </b>
        </div>
        <div>
          <button onClick={minimize}>_</button>
          <button onClick={extend}>{"[]"}</button>
          <button onClick={close}>X</button>
        </div>
      </div>
      <div className='Area'>
    </div>
  </div>)
  }

  export default Window