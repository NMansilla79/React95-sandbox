import '../../App.css';

import HandleLongClick from '../HandleLongClick' //Takes care of detecting when the user is holding down a click, its used for drag and drop

function Window({
    program,//"Program" information given by parent component
    focused = true, //Changes the style of the focused window to reflect it on the headbar and brings it to the front using zIndex
    position = {x: 500, y: 500}, //Initial position if none is given
    //Callbacks for the parent component
    changePosition = ()=>{},
    focus = ()=> {}, 
    minimize = ()=>{}, //@todo: enable and incorporate minimize function
    extend = ()=>{},  //@todo: enable and incorporate window resize funcion
    close = ()=>{}
  })
  
  {
  return (
    <div onMouseDownCapture={focus} id={program.id} className='Window' style={{top: position.y + "px", left: position.x + "px", zIndex: focused ? 1 : 0}}>
      <div  className={focused ? 'Header Focused' : 'Header'}>
        <div className='DragBox' {...HandleLongClick(()=>{changePosition()})}> {/* Drag and drop only works on this section of the window */}
          <b>
            {program.title + program.extension} {program.id}
          </b>
        </div>
        <div className='ButtonBox'>
          <button disabled onClick={minimize}>
            <b>_</b>
          </button>
          <button disabled onClick={extend}>
            <b>□</b>
          </button>
          <button onClick={close}>
            <b>X</b>
          </button>
        </div>
      </div>
      <div className='Area'>
        {/* This where the "Program" would go, for now its a 150x150 blank square for debugging */}
      </div>
    </div>)
  }

  export default Window