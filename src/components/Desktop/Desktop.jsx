import { useState, useContext } from 'react';
import { mousePositionContext, openedWindows } from '../../App'

import '../../App.css';

import HandleLongClick from '../HandleLongClick';
import Window from '../Window';

import defaultIcon from '../../assets/img/Help_page.ico'
import programs from './desktop-icons.json'

function Desktop() {
    const [windows,setWindows] = useContext(openedWindows)
  
    function openWindow(val){
      console.log(val)
      console.log(windows)
      let id
      if(windows.length){
        id = windows[windows.length - 1].id + 1
      }
      else{
        id = 0
      }
      setWindows(windows.concat([{...val,id}]))
    }

    function closeWindow(id){
      console.log('close',id)
      setWindows(windows.filter(window => window.id !== id))
    }
  
    return (<>
      {programs?.length > 0 && 
        programs.map(program => (
          <DesktopIcon key={programs.indexOf(program)} callback={()=>{openWindow(program)}} props={program}/>  
        ))
      }
  
      {windows?.length > 0 && 
        windows.map(window =>(
          <Window key={windows.indexOf(window)} program={window} close={()=>{closeWindow(window.id)}}/>
        ))
      }
    </>)
  }
  
  function DesktopIcon({ props, callback = ()=>{} }) {
    const [mouseCoords] = useContext(mousePositionContext);
    const [iconPosition,setIconPosition] = useState({x: props.position.x, y:  props.position.y})
  
    const startApplication = ()=> {
      callback()
      console.log(props.title)
    }
    
    return (
      <div {...HandleLongClick(()=>{setIconPosition(mouseCoords)})} style={{top: iconPosition.y + "px", left: iconPosition.x + "px"}} className="Desktop-Icon">
        {
          props &&
          <>
            <img draggable={false} onDoubleClick={()=> (startApplication())} src={props.img ? `./assets/img/${props.img}` : defaultIcon} alt="icon"/>
            <span>{props.title + props.extension}</span>
          </> 
        }
      </div>
    )
  }

  export default Desktop