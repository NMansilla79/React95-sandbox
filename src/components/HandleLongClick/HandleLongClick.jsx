import { useRef, useEffect, useCallback  } from 'react';

function HandleLongClick (callback = ()=>{}){
    const longPress = useRef(false)
  
    useEffect(()=>{
      if (longPress.current){
        callback()
      }
    },[callback,longPress])
  
    const start = useCallback(() => {
      longPress.current = true;
    }, []);
    const stop = useCallback(() => {
      longPress.current = false;
    }, []);
  
    return {
      onMouseDown: start,
      onMouseUp: stop,
      onTouchStart: start,
      onTouchEnd: stop,
    };
}

export default HandleLongClick