import { useState, useContext } from 'react';
import { mousePositionContext, openedWindows } from '../../App'

import '../../App.css';

import HandleLongClick from '../HandleLongClick'; //Takes care of detecting when the user is holding down a click, its used for drag and drop
import Window from '../Window';

import defaultIcon from '../../assets/img/Help_page.ico' //default icon in case an image is not provided
import programs from './desktop-icons.json' //JSON with the default desktop icons and "programs", with their associated information

function Desktop() {
    const [windows,setWindows] = useContext(openedWindows)
    const [mouseCoordinates,dimensions] = useContext(mousePositionContext);
    const [stack,setStack] = useState(0) //@todo: differentiate between "programs" once variety is introduced
  
    function openWindow(val){ //Window manager to create and render Windows based off a "program" Object
      const screenSize = {...dimensions}
      const focused = true // New windows are automatically focused
      
      let id //ID for each opened window
      let coordenates = {x:0,y:0}
      
      coordenates.x = screenSize.width / 2 // Define initial window position at the center of the screen
      coordenates.y = screenSize.height / 2 
      
      if(windows.length){ //This is so every window has an unique autoincremental ID
        id = windows[windows.length - 1].id + 1
        if(stack){ // Stacked window effect, resets if window is dragged
          coordenates.x = coordenates.x - 10 * stack  
          coordenates.y = coordenates.y - 10 * stack  
        }
        setWindows(windows.map(window => window.focused = false)) //unfocus all previous windows
      }
      else{
        id = 0 //Default starting id is 0 if there are no windows
      }
      setStack(stack + 1)
      setWindows(windows.concat([{...val,id,focused,coordenates}])) // and we put it all together
    }

    function focusWindow(id){ 
      let windowArray = windows.map(window => ({...window}))  //Creates a deep copy of the current window array. 
      windowArray.forEach(element => {                       //It finds the given window ID it focuses the window and unfocused the rest along the way
        if(element.id !== id){
          element.focused = false
          return
        }
        element.focused = true
      });
      setWindows(windowArray)
    }

    function closeWindow(id){ //Filters out the given Window ID from the current window array
      setWindows(windows.filter(window => window.id !== id))
    }
    //@todo: Move window management functions to their own component
  
    return (<>
      {programs?.length > 0 && 
        programs.map(program => (
          <DesktopIcon key={programs.indexOf(program)} callback={()=>{openWindow(program)}} props={program}/>  
        ))
      }
  
      {windows?.length > 0 && 
        windows.map(window =>(
          <Window key={window.id} 
            program={window} //Window Object with all related program information
            focused={window.focused}      //Focused and position are given individually for the parent to pass down properties as they mutate
            position={window.coordenates} //And to more easily define their initial values 
            changePosition={
              ()=>{
                setStack(0) //When the position of a window is changed, the window stacker resets back
                window.coordenates = {...mouseCoordinates}
              }
            }
            focus={()=>{focusWindow(window.id)}} //Focuses window
            close={()=>{closeWindow(window.id)}} //Closes window
          />
        ))
      }
    </>)
  }
  
  //Component that creates the desktop icons from a "Program" object 
  function DesktopIcon({ props, callback = ()=>{} }) { //@todo: rework position, implement right click to change name, move to it's down file
    const [mouseCoords] = useContext(mousePositionContext);
    const [iconPosition,setIconPosition] = useState({x: props.position.x, y:  props.position.y})
  
    const startApplication = ()=> { //callback to allow parent to open a Window as sibling
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