import { useRef, useEffect, useState, createContext } from 'react';
import Desktop from './components/Desktop';
import Toolbar from './components/Toolbar'

import './App.css';

export const mousePositionContext = createContext(null);
export const openedWindows = createContext([]);

function App() {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x:0, y: 0 });
  const [windows,setWindows] = useState([])

  useEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }

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
