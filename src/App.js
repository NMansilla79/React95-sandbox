//Prototype of React95, a small Windos 95 recreation using ReactJS
/*
  There is a bug when dragging and dropping files and windows. 
  The dragged element will hang onto the cursor when dropped with the cursor outside of the HTML element bounds.
  To avoid it just make sure the cursor is within the icon image or the headbar of a window when letting go of the mouse.
  If it hangs on to your cursor just click again and it will let go.

  I will fix it later.
*/

import { useRef, useEffect, useState, createContext } from 'react';
import Desktop from './components/Desktop' //Desktop component where icons and windows are instanced
import Toolbar from './components/Toolbar' //Taskbar component for menus, icons, clock, and tasks

import './App.css';

export const mousePositionContext = createContext(null); //Provider of window size and mouse position for windows
export const openedWindows = createContext([]); //Provider of Window array

function App() {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x:0, y: 0 });
  const [windows,setWindows] = useState([])

  useEffect(() => { //Dimensions of the browser workspace
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
    //Mouse position
    const handleWindowMouseMove = event => {
      setMouseCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleWindowMouseMove,
      );
    };
  }, []);


  return (
    <div className="Workspace">
      <mousePositionContext.Provider value={[mouseCoords, dimensions]}> 
        <openedWindows.Provider value={[windows,setWindows]}>
          <div className="Desktop" ref={targetRef}>
            <Desktop/>
          </div>
          <Toolbar/>
        </openedWindows.Provider>
      </mousePositionContext.Provider>
    </div>
  );
}

export default App;
