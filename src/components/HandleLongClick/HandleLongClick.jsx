import { useRef, useEffect, useCallback  } from 'react';

// This componets emits a signal when its being pressed down, and a second one when its let go off.
// Currently it is used for desktop icon and window drag and drop feature

//@todo: fix bug that makes window/icon hang onto the cursor until clicked for a second time when let go outside of html element boundary
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