import { useEffect, useState, useContext } from 'react';
import { openedWindows } from '../../App'

import '../../App.css';

//Taskbar tasks generated when a new window is opened
function Task({props,callback = ()=>{}}){//@todo:rearrange order, click to minimize and maximize, double click to expand, move to own file
  return(<>
      <button onClick={callback} className={props.focused ? "active" : undefined}>
        {props.title} {props.id}
      </button>
  </>)
}

//Taskbar clock
function Clock(){ //@todo: move to own file
  const stateDate = new Date()
  const [clock,setClock] = useState({day: stateDate.toLocaleDateString(), time: stateDate.toLocaleTimeString()})
  
  useEffect(()=>{    
    setInterval(()=>{
      const date = new Date()      
      setClock(
        {day: date.toLocaleDateString(), time: date.toLocaleTimeString()}
      )
    }
    ,1000)
  },[])

  return (
  <div className='Clock'> 
    <div>
      {clock.day}
    </div>
    <div>
      {clock.time}
    </div>
  </div>)
}

//Bottom toolbar component, still pretty much barebone
//I realized way too late i was calling the windows Taskbar the Toolbar
function Toolbar(){
  const [windows,setWindows] = useContext(openedWindows)

  function focusWindow(id){
    let windowArray = windows.map(window => ({...window}))
    windowArray.forEach(element => {
      if(element.id !== id){
        element.focused = false
        return
      }
      element.focused = true
    });
    setWindows(windowArray)
  }
  //@todo: Move window management functions to their own component
  //@todo: Add miniature icons for instanced tasks
  //@todo: Create and make React95 button open up 
  return(
  <footer className="Toolbar"> 
    
    <div style={{
      display: 'flex'
    }}>
      <button>
        React95
      </button>

      {windows?.length > 0 && 
        windows.map(window =>(
          <Task key={window.id} props={window} callback={()=>{focusWindow(window.id)}}/>
        ))
      }
      
    </div>
    <Clock/>
  </footer>)
}

export default Toolbar